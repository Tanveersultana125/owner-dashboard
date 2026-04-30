/**
 * feeHistoryService.ts
 *
 * Single source of truth for "fees over last 6 months" used by:
 *  - Dashboard.tsx → Revenue Trend chart (Collected + Pending)
 *  - FinanceFees.tsx → Monthly Collection Trend chart (can adopt later)
 *
 * Match logic mirrors FinanceFees.historyData:
 *  - Buckets by month + year (NOT just month — important across year-end)
 *  - paid → collected, anything else → pending
 *  - amount = parseFloat(amount ?? totalAmount)
 *
 * 60-second in-memory cache per uid.
 */
import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const CACHE_TTL_MS = 60_000;

export interface FeeHistoryPoint {
  month: string;       // "Apr"
  monthIdx: number;    // 0-11
  year: number;        // 2026
  collected: number;   // ₹ in thousands
  pending: number;     // ₹ in thousands
  revenue: number;     // alias for collected, kept for the existing Dashboard chart
}

/** Owner-scope fee stats — shared between Dashboard's "Fee Collection Rate"
 *  card and FinanceFees' hero so both surfaces always show the same numbers. */
export interface FeeStats {
  collectionRate: number;  // % of paid records (one decimal place)
  collectedAmt:   number;  // ₹ sum of paid records
  outstanding:    number;  // ₹ sum of unpaid records
  paidCount:      number;
  totalCount:     number;
}

interface CacheEntry { data: FeeHistoryPoint[]; ts: number }
interface StatsCacheEntry { data: FeeStats; ts: number }
const _cache = new Map<string, CacheEntry>();
const _statsCache = new Map<string, StatsCacheEntry>();

function cacheKey(uid: string, branchId?: string): string {
  return branchId ? `${uid}::${branchId}` : uid;
}

function parseAmount(raw: unknown): number {
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : 0;
  if (typeof raw === "string") {
    const n = parseFloat(raw);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

function toDate(v: unknown): Date | null {
  if (!v || typeof v !== "object") return null;
  const x = v as { toDate?: () => Date };
  if (typeof x.toDate === "function") {
    try { return x.toDate(); } catch { return null; }
  }
  return null;
}

export function invalidateFeeHistoryCache(uid?: string): void {
  if (!uid) { _cache.clear(); _statsCache.clear(); return; }
  for (const key of _cache.keys()) {
    if (key === uid || key.startsWith(`${uid}::`)) _cache.delete(key);
  }
  _statsCache.delete(uid);
}

const EMPTY_STATS: FeeStats = {
  collectionRate: 0, collectedAmt: 0, outstanding: 0, paidCount: 0, totalCount: 0,
};

/**
 * Owner-scope fee statistics. Single source of truth for the count-based
 * collection rate and amount-based collected/outstanding totals.
 *
 * Match logic mirrors FinanceFees.stats:
 *  - paid → counted in collectionRate numerator + collectedAmt
 *  - anything else → counted in outstanding
 *  - amount = parseFloat(amount ?? totalAmount)
 */
export async function fetchFeeStats(uid: string): Promise<FeeStats> {
  if (!uid) return EMPTY_STATS;

  const cached = _statsCache.get(uid);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) return cached.data;

  let feesSnap;
  try {
    feesSnap = await getDocs(query(collection(db, "fees"), where("schoolId", "==", uid)));
  } catch (err) {
    console.warn("[feeHistoryService] stats query failed:", err);
    return EMPTY_STATS;
  }

  let paidCount = 0, collectedAmt = 0, outstanding = 0;
  feesSnap.docs.forEach(d => {
    const data = d.data() as Record<string, unknown>;
    const status = String(data.status || "").toLowerCase();
    const amt = parseAmount(data.amount ?? data.totalAmount);
    if (status === "paid") { paidCount++; collectedAmt += amt; }
    else outstanding += amt;
  });

  const total = feesSnap.size;
  const stats: FeeStats = {
    collectionRate: total > 0 ? Math.round((paidCount / total) * 1000) / 10 : 0,
    collectedAmt: Math.round(collectedAmt),
    outstanding: Math.round(outstanding),
    paidCount,
    totalCount: total,
  };
  _statsCache.set(uid, { data: stats, ts: Date.now() });
  return stats;
}

/** Compact fee record for in-memory bucketing. Pages that already have raw fee
 *  docs in state can use `bucketFeeHistory` directly without re-fetching. */
export interface RawFeeRecord {
  branchId: string;
  status: string;       // lowercased
  amount: number;       // parsed, never NaN
  date: Date | null;    // paidAt ?? createdAt
}

/** Convert any Firestore fee doc shape into the compact RawFeeRecord
 *  used by bucketFeeHistory. Centralizes field-name handling so callers
 *  don't drift from the canonical parsing. */
export function normalizeFeeDoc(data: Record<string, unknown>): RawFeeRecord {
  return {
    branchId: typeof data.branchId === "string" ? data.branchId : "",
    status:   String(data.status || "").toLowerCase(),
    amount:   parseAmount(data.amount ?? data.totalAmount),
    date:     toDate(data.paidAt ?? data.createdAt),
  };
}

/** Compute owner-scope fee stats from pre-parsed records. Pure function — no I/O.
 *  Mirrors fetchFeeStats math exactly so callers that already hold raw fee docs
 *  (e.g. Dashboard.fetchAll) can avoid a second Firestore read. */
export function computeFeeStats(records: { status: string; amount: number }[]): FeeStats {
  let paidCount = 0, collectedAmt = 0, outstanding = 0;
  records.forEach(r => {
    if (r.status === "paid") { paidCount++; collectedAmt += r.amount; }
    else outstanding += r.amount;
  });
  const total = records.length;
  return {
    collectionRate: total > 0 ? Math.round((paidCount / total) * 1000) / 10 : 0,
    collectedAmt:   Math.round(collectedAmt),
    outstanding:    Math.round(outstanding),
    paidCount,
    totalCount:     total,
  };
}

/** Bucket pre-parsed fee records into the last-6-month FeeHistoryPoint[] shape.
 *  Pure function — no I/O. Single source of truth for the chart shape used by
 *  Dashboard's Revenue Trend AND FinanceFees' Monthly Collection chart. */
export function bucketFeeHistory(
  fees: RawFeeRecord[], branchId?: string,
): FeeHistoryPoint[] {
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    return { label: MONTH_NAMES[d.getMonth()], monthIdx: d.getMonth(), year: d.getFullYear() };
  });
  const filtered = fees.filter(f => f.date && (!branchId || f.branchId === branchId));

  return months.map(({ label, monthIdx, year }) => {
    let collected = 0, pending = 0;
    filtered.forEach(f => {
      if (!f.date) return;
      if (f.date.getMonth() !== monthIdx || f.date.getFullYear() !== year) return;
      if (f.status === "paid") collected += f.amount;
      else                     pending   += f.amount;
    });
    const collectedK = Math.round(collected / 1000);
    return {
      month: label, monthIdx, year,
      collected: collectedK,
      pending:   Math.round(pending / 1000),
      revenue:   collectedK,
    };
  });
}

/**
 * Last-6-months fee history for an owner.
 * Pass `branchId` to filter to a single branch (matches `branchId` field on fee docs).
 */
export async function fetchFeeHistory(
  uid: string, branchId?: string,
): Promise<FeeHistoryPoint[]> {
  if (!uid) return [];

  const key = cacheKey(uid, branchId);
  const cached = _cache.get(key);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) return cached.data;

  let feesSnap;
  try {
    feesSnap = await getDocs(query(collection(db, "fees"), where("schoolId", "==", uid)));
  } catch (err) {
    console.warn("[feeHistoryService] fees query failed:", err);
    // Empty 6-month skeleton on error
    return bucketFeeHistory([], branchId);
  }

  const records = feesSnap.docs.map(d => normalizeFeeDoc(d.data() as Record<string, unknown>));
  const data = bucketFeeHistory(records, branchId);
  _cache.set(key, { data, ts: Date.now() });
  return data;
}


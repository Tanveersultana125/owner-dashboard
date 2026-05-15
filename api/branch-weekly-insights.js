// api/branch-weekly-insights.js — Vercel serverless endpoint that generates
// the weekly AI insights surfaced on the Owner's Branch Detail page below
// the Historical Performance chart.
//
// Returns four narrative blocks derived purely from the branch's current
// metrics (AHI, attendance, pass rate, fee collection, growth, at-risk
// count) compared against the school network average:
//
//   • trendReasons       — WHY the trend looks the way it does (root cause)
//   • suggestions        — actionable next steps the owner can take
//   • strengths          — what this branch is doing well, with numbers
//   • areasOfImprovement — what's lagging and by how much
//
// Auth: Firebase ID token via Authorization: Bearer header.
// Server-only env: OPENAI_API_KEY.
// Cached weekly per branch in `branch_weekly_insights/{branchId}_{isoWeek}`
// on the client side — this endpoint stays stateless and idempotent.
//
// 503 → client falls back to rule-based copy so the UI never blanks.

import { applyCors, requireAuth, rateLimit } from "./_auth.js";

const MODEL = "gpt-4o-mini";
const MAX_BRANCH_NAME = 120;

function clean(v, max = 200) {
  if (v === null || v === undefined) return "";
  const s = String(v);
  return s.length > max ? s.slice(0, max) : s;
}
function num(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

// ── Prompt builder ─────────────────────────────────────────────────────────
function buildPrompt(branch, network) {
  const name        = clean(branch.name, MAX_BRANCH_NAME);
  const ahi         = num(branch.ahi);
  const attendance  = num(branch.attendance);
  const passRate    = num(branch.passRate);
  const feeColl     = num(branch.feeCollection);
  const growth      = num(branch.growthRate);
  const studentCount = num(branch.studentCount);
  const teacherCount = num(branch.teacherCount);
  const atRisk      = num(branch.activeAlerts);
  const atRiskPct   = studentCount > 0 ? (atRisk / studentCount) * 100 : 0;

  const netAhi        = num(network.avgAhi);
  const netAttendance = num(network.avgAttendance);
  const netPassRate   = num(network.avgPassRate);
  const netFeeColl    = num(network.avgFeeCollection);

  const recentTrend = Array.isArray(branch.historicalTrend)
    ? branch.historicalTrend
        .filter(t => typeof t?.score === "number")
        .slice(-8)
        .map(t => `${t.period}:${t.score}`).join(", ")
    : "";

  return `Branch: ${name}
Network avg: AHI ${netAhi}, attendance ${netAttendance}%, pass rate ${netPassRate}%, fee collection ${netFeeColl}%

CURRENT METRICS (real, from Firestore aggregation):
- Academic Health Index (AHI): ${ahi} (network avg ${netAhi})
- Attendance: ${attendance}% (network avg ${netAttendance}%)
- Pass rate: ${passRate}% (network avg ${netPassRate}%)
- Fee collection: ${feeColl}% (network avg ${netFeeColl}%)
- Growth rate (MoM): ${growth.toFixed(1)} points
- Students: ${studentCount}, Teachers: ${teacherCount}
- At-risk students: ${atRisk} (${atRiskPct.toFixed(1)}% of class)
- Recent 8-week trend (period:score): ${recentTrend || "no historical data yet"}

Generate the FOUR sections below. Each item MUST cite a specific number from
the metrics above — no vague platitudes. Be honest: if a metric is poor say
so directly with the number, if a metric is strong call it out the same way.

Return ONLY this JSON (no markdown, no commentary):
{
  "trendReasons": [
    { "headline": "Short label (e.g. 'Attendance is climbing')", "detail": "1-2 sentences citing exact numbers and the likely root cause." }
  ],
  "suggestions": [
    { "headline": "Concrete action (e.g. 'Run parent-meeting drive in 2 weeks')", "detail": "1-2 sentences explaining the expected lift and what to measure." }
  ],
  "strengths": [
    { "headline": "Strength label citing the metric (e.g. 'Fee collection 94%')", "detail": "1 sentence explaining why this is a strength and how to preserve it." }
  ],
  "areasOfImprovement": [
    { "headline": "Area label with the gap (e.g. 'Pass rate 12 points below network')", "detail": "1 sentence on what's likely driving the gap." }
  ]
}

Rules:
- 3-4 items in each section
- "headline" max 80 chars, "detail" max 220 chars
- Never invent metrics — if a value is 0 or missing, treat it as "no data yet"
- Tone: senior school analyst briefing the owner — factual, decisive`;
}

// ── Sanitizer ─────────────────────────────────────────────────────────────
function sanitizeSection(arr, max = 4) {
  if (!Array.isArray(arr)) return [];
  return arr
    .slice(0, max)
    .map(it => ({
      headline: clean(it?.headline, 80),
      detail:   clean(it?.detail, 220),
    }))
    .filter(it => it.headline && it.detail);
}

// ── Handler ────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  applyCors(req, res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")    return res.status(405).json({ error: "Method not allowed" });

  const decoded = await requireAuth(req, res);
  if (!decoded) return;

  if (!rateLimit(`branch-weekly-insights:${decoded.uid}`, 20)) {
    return res.status(429).json({ error: "Too many requests. Try again in a minute." });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "AI insights not configured." });
  }

  const { branch, network } = req.body || {};
  if (!branch || !network) {
    return res.status(400).json({ error: "Missing branch / network payload." });
  }

  const userPrompt = buildPrompt(branch, network);
  const systemPrompt =
    "You are a senior school network analyst. Read the branch's current metrics, " +
    "compare against the network average, and explain trends + recommend next " +
    "steps in plain English. Every bullet must reference a specific number. " +
    "Reply ONLY with valid JSON in the exact schema provided.";

  try {
    const oaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.4,
        response_format: { type: "json_object" },
        max_tokens: 1800,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user",   content: userPrompt },
        ],
      }),
    });

    if (!oaiRes.ok) {
      const errBody = await oaiRes.text().catch(() => "");
      console.error("[branch-weekly-insights] OpenAI error:", oaiRes.status, errBody.slice(0, 300));
      return res.status(502).json({ error: "AI provider error." });
    }

    const data = await oaiRes.json();
    const raw  = data?.choices?.[0]?.message?.content || "{}";
    let parsed;
    try { parsed = JSON.parse(raw); }
    catch { parsed = {}; }

    const insight = {
      trendReasons:       sanitizeSection(parsed?.trendReasons, 4),
      suggestions:        sanitizeSection(parsed?.suggestions, 4),
      strengths:          sanitizeSection(parsed?.strengths, 4),
      areasOfImprovement: sanitizeSection(parsed?.areasOfImprovement, 4),
    };

    // Reject empty AI output so client falls back to rule-based.
    const total = insight.trendReasons.length + insight.suggestions.length
                + insight.strengths.length + insight.areasOfImprovement.length;
    if (total === 0) {
      return res.status(502).json({ error: "AI returned empty insight." });
    }

    return res.status(200).json({
      model: MODEL,
      generatedAt: Date.now(),
      insight,
    });
  } catch (err) {
    console.error("[branch-weekly-insights] Network error:", err);
    return res.status(500).json({ error: "Failed to generate insight." });
  }
}

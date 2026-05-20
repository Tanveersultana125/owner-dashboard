/**
 * reportWebVitals.ts — minimal Core Web Vitals collector (no npm deps).
 *
 * Uses native browser PerformanceObserver APIs to capture:
 *   - LCP (Largest Contentful Paint) — loading speed
 *   - CLS (Cumulative Layout Shift) — visual stability
 *   - INP (Interaction to Next Paint) — responsiveness (proxy: max event delay)
 *   - FCP (First Contentful Paint) — first paint timing
 *   - TTFB (Time to First Byte) — server response
 *
 * Output: console.info in dev; ready-to-wire to /api/metrics or Firebase
 * Analytics in production. Wire by editing `reportMetric()` below.
 *
 * Call once from main.tsx:
 *     import { reportWebVitals } from "@/lib/reportWebVitals";
 *     reportWebVitals();
 *
 * Pure-frontend, zero dependencies. Safe to run in any browser context.
 */

type Metric = {
  name: "LCP" | "CLS" | "INP" | "FCP" | "TTFB";
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  id: string;
};

// Thresholds per web.dev's Core Web Vitals targets (2024+).
// (Values in ms unless stated otherwise.)
const THRESHOLDS: Record<Metric["name"], [number, number]> = {
  LCP:  [2500, 4000],   // < 2.5s good, 2.5–4s needs-imp, > 4s poor
  CLS:  [0.1, 0.25],    // unitless layout-shift score
  INP:  [200, 500],     // < 200ms good
  FCP:  [1800, 3000],
  TTFB: [800, 1800],
};

const rate = (name: Metric["name"], value: number): Metric["rating"] => {
  const [good, poor] = THRESHOLDS[name];
  if (value <= good) return "good";
  if (value <= poor) return "needs-improvement";
  return "poor";
};

const uniqId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

function reportMetric(m: Metric) {
  // Dev: print to console.
  if (import.meta.env.DEV) {
    const emoji = m.rating === "good" ? "✅" : m.rating === "needs-improvement" ? "⚠️" : "🔴";
    console.info(`[WebVitals] ${emoji} ${m.name} = ${m.value.toFixed(2)} (${m.rating})`);
    return;
  }

  // Prod hook: send to your analytics endpoint here.
  // Example (uncomment + wire):
  //
  // navigator.sendBeacon?.("/api/metrics", JSON.stringify(m))
  //   || fetch("/api/metrics", { method: "POST", body: JSON.stringify(m), keepalive: true });
}

let lcpValue = 0;
let clsValue = 0;
let inpValue = 0;

export function reportWebVitals() {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) return;

  // ── LCP — biggest paint in viewport. Reported on page-unload / hidden.
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      // The LAST entry is the largest. (Chrome may emit several as new
      // candidates appear; only the final one matters.)
      const entries = list.getEntries() as PerformanceEntry[];
      const last = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
      lcpValue = last.startTime;
    });
    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

    // Flush LCP when the page becomes hidden (tab switch, close, navigation).
    addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden" && lcpValue > 0) {
        reportMetric({
          name: "LCP",
          value: lcpValue,
          rating: rate("LCP", lcpValue),
          delta: lcpValue,
          id: uniqId(),
        });
        lcpObserver.disconnect();
      }
    }, { once: true });
  } catch { /* unsupported */ }

  // ── CLS — accumulated layout-shift score over the session.
  try {
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const ls = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
        if (!ls.hadRecentInput) {
          clsValue += ls.value;
        }
      });
    });
    clsObserver.observe({ type: "layout-shift", buffered: true });

    addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        reportMetric({
          name: "CLS",
          value: clsValue,
          rating: rate("CLS", clsValue),
          delta: clsValue,
          id: uniqId(),
        });
        clsObserver.disconnect();
      }
    }, { once: true });
  } catch { /* unsupported */ }

  // ── INP proxy — max event processing time.
  // Real INP requires `event-timing` entries; we approximate with the max
  // observed event duration. Good enough as a dev signal.
  try {
    const eventObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const e = entry as PerformanceEntry & { duration: number };
        if (e.duration > inpValue) inpValue = e.duration;
      });
    });
    eventObserver.observe({ type: "event", buffered: true, durationThreshold: 40 } as PerformanceObserverInit);

    addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden" && inpValue > 0) {
        reportMetric({
          name: "INP",
          value: inpValue,
          rating: rate("INP", inpValue),
          delta: inpValue,
          id: uniqId(),
        });
        eventObserver.disconnect();
      }
    }, { once: true });
  } catch { /* unsupported */ }

  // ── FCP + TTFB — one-shot, available immediately from navigation timing.
  try {
    const navEntries = performance.getEntriesByType("navigation");
    if (navEntries.length > 0) {
      const nav = navEntries[0] as PerformanceNavigationTiming;
      const ttfb = nav.responseStart - nav.requestStart;
      if (ttfb > 0) {
        reportMetric({
          name: "TTFB",
          value: ttfb,
          rating: rate("TTFB", ttfb),
          delta: ttfb,
          id: uniqId(),
        });
      }
    }
    const paintEntries = performance.getEntriesByType("paint");
    const fcp = paintEntries.find(p => p.name === "first-contentful-paint");
    if (fcp) {
      reportMetric({
        name: "FCP",
        value: fcp.startTime,
        rating: rate("FCP", fcp.startTime),
        delta: fcp.startTime,
        id: uniqId(),
      });
    }
  } catch { /* unsupported */ }
}

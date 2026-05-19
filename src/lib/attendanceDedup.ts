/**
 * Attendance dedup helper — one canonical record per (student, day).
 *
 * `MarkAttendance.tsx` (teacher dashboard) writes docs with composite id
 * `${studentId}_${classId}_${date}`. If a student is in 2+ classes and
 * different teachers each mark them, two separate attendance docs survive
 * for the same student/day. Per-student aggregations would double-count.
 *
 * Apply at READ sites where the same student's attendance is being
 * aggregated across classes (e.g. owner StudentProfile).
 *
 * Mirrors parent/teacher/principal helpers — same priority rule:
 *   1. Holiday wins over present/absent/late (closes multi-teacher loophole)
 *   2. Otherwise latest createdAt wins
 */

interface AttendanceLike {
  id?: string;
  date?: string;
  status?: string;
  createdAt?: { toMillis?: () => number; seconds?: number } | string | number | null;
  [k: string]: unknown;
}

const tsMs = (v: AttendanceLike["createdAt"]): number => {
  if (!v) return 0;
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const t = Date.parse(v);
    return isNaN(t) ? 0 : t;
  }
  if (typeof v === "object") {
    if (typeof v.toMillis === "function") return v.toMillis();
    if (typeof v.seconds === "number") return v.seconds * 1000;
  }
  return 0;
};

export function dedupAttendanceByDay<T extends AttendanceLike>(logs: T[]): T[] {
  if (logs.length < 2) return logs.slice();
  const byDay = new Map<string, T>();
  logs.forEach((l) => {
    if (!l.date) return;
    const existing = byDay.get(l.date);
    if (!existing) { byDay.set(l.date, l); return; }
    // Holiday wins over present/absent/late regardless of createdAt — closes
    // the multi-teacher loophole. Memory ref: feature_attendance_holiday_status.
    const existingIsHoliday = (existing.status || "").toLowerCase() === "holiday";
    const incomingIsHoliday = (l.status || "").toLowerCase() === "holiday";
    if (existingIsHoliday && !incomingIsHoliday) return;
    if (incomingIsHoliday && !existingIsHoliday) { byDay.set(l.date, l); return; }
    // Both same priority → latest createdAt wins.
    const existingMs = tsMs(existing.createdAt);
    const newMs = tsMs(l.createdAt);
    if (newMs > existingMs) byDay.set(l.date, l);
  });
  return Array.from(byDay.values());
}

export function dedupAndSortAttendance<T extends AttendanceLike>(logs: T[]): T[] {
  return dedupAttendanceByDay(logs).sort((a, b) =>
    (b.date || "").localeCompare(a.date || ""),
  );
}

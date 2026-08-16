import type { TimeSlot } from "@/lib/types";

/** Generate mock slots for the next 14 days for a trainer */
export function getAvailabilityForDate(dateISO: string): TimeSlot[] {
  const day = new Date(dateISO + "T12:00:00").getDay();
  const weekend = day === 0 || day === 6;
  const base = weekend
    ? ["09:00", "10:30", "12:00", "14:00", "16:00"]
    : ["07:00", "08:30", "10:00", "12:00", "14:00", "16:00", "18:00", "19:30"];

  // Deterministic pseudo-random availability from date string
  let hash = 0;
  for (let i = 0; i < dateISO.length; i++) {
    hash = (hash * 31 + dateISO.charCodeAt(i)) >>> 0;
  }

  return base.map((time, index) => ({
    time,
    available: ((hash >> index) & 1) === 1 || index % 3 !== 0,
  }));
}

export function upcomingDates(count = 14): string[] {
  const dates: string[] = [];
  const start = new Date();
  start.setHours(12, 0, 0, 0);
  for (let i = 1; i <= count; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

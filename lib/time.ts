// lib/time.ts

// Parse "h:mm AM/PM" into a Date representing tonight's closing time.
function parseCloseTime(openUntil?: string, now = new Date()): Date | null {
  if (!openUntil) return null;
  const m = openUntil.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return null;

  const hh = parseInt(m[1], 10);
  const mm = parseInt(m[2], 10);
  const ap = m[3].toUpperCase();

  let h24 = hh % 12;
  if (ap === "PM") h24 += 12;

  const close = new Date(now);
  close.setHours(h24, mm, 0, 0);

  // If close time is 12–5:59 AM and it's currently evening (>= 18:00),
  // treat close as "next day".
  if (h24 < 6 && now.getHours() >= 18) {
    close.setDate(close.getDate() + 1);
  }
  return close;
}

// ✅ Named export
export function isOpenNow(openUntil?: string, now = new Date()): boolean | null {
  const close = parseCloseTime(openUntil, now);
  if (!close) return null;
  return now <= close;
}

// ✅ Named export
export function minutesUntilClose(openUntil?: string, now = new Date()): number | null {
  const close = parseCloseTime(openUntil, now);
  if (!close) return null;
  const diffMs = close.getTime() - now.getTime();
  return Math.ceil(diffMs / 60000);
}

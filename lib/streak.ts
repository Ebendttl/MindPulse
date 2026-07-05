import { MoodEntry } from "@/types";

/**
 * Calculates the logging streak (consecutive days logged).
 * A streak continues if there is a log for today or yesterday.
 * If the most recent log is older than yesterday, the streak is 0.
 * Missed days reset the streak. Same-day re-logs do not affect the count.
 */
export function calculateStreak(entries: MoodEntry[]): number {
  if (!entries || entries.length === 0) {
    return 0;
  }

  // Extract unique dates in YYYY-MM-DD, sorted descending
  const uniqueDates = Array.from(new Set(entries.map((e) => e.date)))
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  if (uniqueDates.length === 0) {
    return 0;
  }

  // Parse dates as local midnights to avoid timezone shifts
  const parseLocalDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const mostRecentLogDate = parseLocalDate(uniqueDates[0]);

  // If the last log was neither today nor yesterday, the streak is broken (0 days)
  if (
    mostRecentLogDate.getTime() !== today.getTime() &&
    mostRecentLogDate.getTime() !== yesterday.getTime()
  ) {
    return 0;
  }

  let streak = 1;
  let currentDate = mostRecentLogDate;

  // Walk through the unique dates and check if the next one is exactly 1 day before the current one
  for (let i = 1; i < uniqueDates.length; i++) {
    const prevDate = parseLocalDate(uniqueDates[i]);
    
    // Calculate difference in calendar days
    const diffTime = currentDate.getTime() - prevDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak++;
      currentDate = prevDate;
    } else if (diffDays > 1) {
      break; // Gap detected, streak is broken
    }
    // if diffDays is 0 (same day), we just continue (ignore duplicates)
  }

  return streak;
}

import { calculateStreak } from "./streak";
import { getCorrelationInsight } from "./insights";
import { MoodEntry } from "@/types";

// Helper to create a mood entry mock
function createMockEntry(date: string, moodValue: 1 | 2 | 3 | 4 | 5 | 6, tags: string[] = [], id = "id"): MoodEntry {
  return {
    id,
    date,
    moodValue,
    tags,
    timestamp: new Date(date + "T12:00:00").getTime(),
  };
}

// Get dates relative to today
function getRelativeDateString(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const todayStr = getRelativeDateString(0);
const yesterdayStr = getRelativeDateString(1);
const twoDaysAgoStr = getRelativeDateString(2);
const threeDaysAgoStr = getRelativeDateString(3);
const fourDaysAgoStr = getRelativeDateString(4);

let failures = 0;

function assert(condition: boolean, testName: string, message?: string) {
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
  } else {
    console.error(`❌ FAIL: ${testName} - ${message || "Assertion failed"}`);
    failures++;
  }
}

// ==========================================
// RUN STREAK TESTS
// ==========================================
console.log("--- Running Streak Tests ---");

// Test 1: Empty list
assert(calculateStreak([]) === 0, "Empty list returns 0");

// Test 2: Only today logged
assert(
  calculateStreak([createMockEntry(todayStr, 5)]) === 1,
  "Only today logged returns 1"
);

// Test 3: Only yesterday logged
assert(
  calculateStreak([createMockEntry(yesterdayStr, 4)]) === 1,
  "Only yesterday logged returns 1"
);

// Test 4: Only 2 days ago logged
assert(
  calculateStreak([createMockEntry(twoDaysAgoStr, 3)]) === 0,
  "Only 2 days ago logged returns 0 (broken)"
);

// Test 5: Consecutive streak (today + yesterday + 2 days ago)
assert(
  calculateStreak([
    createMockEntry(todayStr, 5),
    createMockEntry(yesterdayStr, 4),
    createMockEntry(twoDaysAgoStr, 3),
  ]) === 3,
  "Today + yesterday + two days ago returns 3"
);

// Test 6: Missed day resets streak
assert(
  calculateStreak([
    createMockEntry(todayStr, 5),
    createMockEntry(yesterdayStr, 4),
    // Missed 2 days ago
    createMockEntry(threeDaysAgoStr, 3),
  ]) === 2,
  "Missed day breaks streak (returns 2)"
);

// Test 7: Same-day re-logs do not duplicate date counts
assert(
  calculateStreak([
    createMockEntry(todayStr, 5, [], "1"),
    createMockEntry(todayStr, 6, [], "2"), // same-day log
    createMockEntry(yesterdayStr, 4, [], "3"),
  ]) === 2,
  "Duplicate same-day logs do not double count (returns 2)"
);

// ==========================================
// RUN CORRELATION TESTS
// ==========================================
console.log("\n--- Running Correlation Tests ---");

// Test 8: Not enough entries (fewer than 5)
const lowEntryCount = [
  createMockEntry(todayStr, 5, ["Work"]),
  createMockEntry(yesterdayStr, 4, ["Work"]),
];
assert(
  getCorrelationInsight(lowEntryCount) === null,
  "Fewer than 5 entries returns null"
);

// Test 9: 5 entries but no tags used
const noTagsEntries = [
  createMockEntry(todayStr, 5),
  createMockEntry(yesterdayStr, 4),
  createMockEntry(twoDaysAgoStr, 3),
  createMockEntry(threeDaysAgoStr, 4),
  createMockEntry(fourDaysAgoStr, 5),
];
assert(
  getCorrelationInsight(noTagsEntries) === null,
  "5 entries with no tags returns null"
);

// Test 10: Low mood correlation with Work tag
// We have 5 entries total, 3 are low mood (<=3) and all 3 low-mood entries are tagged "Work"
const lowMoodWorkEntries = [
  createMockEntry(todayStr, 2, ["Work"]),
  createMockEntry(yesterdayStr, 1, ["Work"]),
  createMockEntry(twoDaysAgoStr, 3, ["Work"]),
  createMockEntry(threeDaysAgoStr, 6, ["Exercise"]),
  createMockEntry(fourDaysAgoStr, 5, ["Exercise"]),
];
const lowInsight = getCorrelationInsight(lowMoodWorkEntries);
assert(
  lowInsight !== null && lowInsight.includes("lower on days tagged Work"),
  "Correctly correlates low mood with Work tag",
  `Got: ${lowInsight}`
);

// Test 11: High mood correlation with Exercise tag
const highMoodExerciseEntries = [
  createMockEntry(todayStr, 6, ["Exercise"]),
  createMockEntry(yesterdayStr, 5, ["Exercise"]),
  createMockEntry(twoDaysAgoStr, 6, ["Exercise"]),
  createMockEntry(threeDaysAgoStr, 3, ["Work"]),
  createMockEntry(fourDaysAgoStr, 3, ["Work"]),
];
const highInsight = getCorrelationInsight(highMoodExerciseEntries);
assert(
  highInsight !== null && highInsight.includes("higher on days tagged Exercise"),
  "Correctly correlates high mood with Exercise tag",
  `Got: ${highInsight}`
);

// Test 12: Average difference fallback correlation
// Total: 6 entries. Overall average mood = (6+6+3+3+3+3)/6 = 4.0
// "Social" is used 2 times, both times mood is 6 (average = 6.0)
// Diff = 6.0 - 4.0 = 2.0 (>= 0.4), so it should correlate
const avgDiffEntries = [
  createMockEntry(todayStr, 6, ["Social"]),
  createMockEntry(yesterdayStr, 6, ["Social"]),
  createMockEntry(twoDaysAgoStr, 3, ["Work"]),
  createMockEntry(threeDaysAgoStr, 3, ["Work"]),
  createMockEntry(fourDaysAgoStr, 3),
  createMockEntry(getRelativeDateString(5), 3),
];
const avgInsight = getCorrelationInsight(avgDiffEntries);
assert(
  avgInsight !== null && avgInsight.includes("higher on days tagged Social"),
  "Correctly falls back to average mood difference for Social tag",
  `Got: ${avgInsight}`
);

// Exit code based on success
console.log(`\nTests completed. Failures: ${failures}`);
process.exit(failures > 0 ? 1 : 0);

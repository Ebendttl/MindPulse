import { MoodEntry, MoodValue } from "@/types";

/**
 * Computes a plain-language correlation between mood values and context tags.
 * Requires at least 5 entries and some tags used to generate an insight.
 * Returns null if there is not enough data.
 */
export function getCorrelationInsight(entries: MoodEntry[]): string | null {
  // We need a minimum amount of data to make any correlation meaningful
  if (entries.length < 5) {
    return null;
  }

  // Extract all entries that have tags
  const entriesWithTags = entries.filter((e) => e.tags && e.tags.length > 0);
  if (entriesWithTags.length < 3) {
    return null;
  }

  // 1. Analyze Low Mood Correlations (moodValue <= 3)
  const lowMoodEntries = entries.filter((e) => e.moodValue <= 3);
  if (lowMoodEntries.length >= 3) {
    // Look at up to the last 5 low-mood entries
    const recentLowEntries = lowMoodEntries.slice(0, 5);
    const tagCountsInLow: Record<string, number> = {};

    recentLowEntries.forEach((entry) => {
      entry.tags?.forEach((tag) => {
        tagCountsInLow[tag] = (tagCountsInLow[tag] || 0) + 1;
      });
    });

    // Find the tag most correlated with low mood
    let bestLowTag = "";
    let maxLowCount = 0;

    Object.entries(tagCountsInLow).forEach(([tag, count]) => {
      if (count > maxLowCount) {
        maxLowCount = count;
        bestLowTag = tag;
      }
    });

    // If a tag is present in at least 60% of the recent low moods and logged at least 3 times
    if (bestLowTag && maxLowCount >= 3 && maxLowCount >= Math.ceil(recentLowEntries.length * 0.6)) {
      return `Your mood tends to be lower on days tagged ${bestLowTag} — logged in ${maxLowCount} of your last ${recentLowEntries.length} low-mood entries.`;
    }
  }

  // 2. Analyze High Mood Correlations (moodValue >= 5)
  const highMoodEntries = entries.filter((e) => e.moodValue >= 5);
  if (highMoodEntries.length >= 3) {
    // Look at up to the last 5 high-mood entries
    const recentHighEntries = highMoodEntries.slice(0, 5);
    const tagCountsInHigh: Record<string, number> = {};

    recentHighEntries.forEach((entry) => {
      entry.tags?.forEach((tag) => {
        tagCountsInHigh[tag] = (tagCountsInHigh[tag] || 0) + 1;
      });
    });

    // Find the tag most correlated with high mood
    let bestHighTag = "";
    let maxHighCount = 0;

    Object.entries(tagCountsInHigh).forEach(([tag, count]) => {
      if (count > maxHighCount) {
        maxHighCount = count;
        bestHighTag = tag;
      }
    });

    // If a tag is present in at least 60% of the recent high moods and logged at least 3 times
    if (bestHighTag && maxHighCount >= 3 && maxHighCount >= Math.ceil(recentHighEntries.length * 0.6)) {
      return `Your mood tends to be higher on days tagged ${bestHighTag} — logged in ${maxHighCount} of your last ${recentHighEntries.length} high-mood entries.`;
    }
  }

  // 3. Fallback: Compare Average Mood with vs without tags
  // Calculate overall average
  const totalMoodSum = entries.reduce((sum, e) => sum + e.moodValue, 0);
  const overallAvg = totalMoodSum / entries.length;

  // Group entries by tag
  const tagMoodSums: Record<string, { sum: number; count: number }> = {};
  entriesWithTags.forEach((entry) => {
    entry.tags?.forEach((tag) => {
      if (!tagMoodSums[tag]) {
        tagMoodSums[tag] = { sum: 0, count: 0 };
      }
      tagMoodSums[tag].sum += entry.moodValue;
      tagMoodSums[tag].count += 1;
    });
  });

  let bestDiff = 0;
  let bestTag = "";
  let isHigher = false;
  let tagAvgVal = 0;

  Object.entries(tagMoodSums).forEach(([tag, stats]) => {
    // We want at least 2 entries with the tag to avoid single-day outliers
    if (stats.count >= 2) {
      const tagAvg = stats.sum / stats.count;
      const diff = tagAvg - overallAvg;
      if (Math.abs(diff) > Math.abs(bestDiff)) {
        bestDiff = diff;
        bestTag = tag;
        isHigher = diff > 0;
        tagAvgVal = tagAvg;
      }
    }
  });

  // If there's a difference of at least 0.4, report it
  if (bestTag && Math.abs(bestDiff) >= 0.4) {
    const direction = isHigher ? "higher" : "lower";
    return `Your mood tends to be ${direction} on days tagged ${bestTag} — average mood of ${tagAvgVal.toFixed(1)} vs ${overallAvg.toFixed(1)} overall.`;
  }

  return null;
}

import { MoodEntry, MoodValue, MoodStats } from "@/types";

const STORAGE_KEY = "mindpulse_mood_entries";

// Helper to check if we are in the browser environment
const isBrowser = () => typeof window !== "undefined";

/**
 * Loads all mood entries from localStorage, sorted by date descending.
 */
export function getMoodEntries(): MoodEntry[] {
  if (!isBrowser()) return [];

  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) return [];

    const parsed: MoodEntry[] = JSON.parse(rawData);
    // Sort descending by date, then by timestamp
    return parsed.sort((a, b) => {
      const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
      if (dateDiff !== 0) return dateDiff;
      return b.timestamp - a.timestamp;
    });
  } catch (error) {
    console.error("Failed to load mood entries:", error);
    return [];
  }
}

/**
 * Saves a new mood entry or updates an existing one for the same date.
 * Each date should only have one daily entry.
 */
export function saveMoodEntry(entryData: Omit<MoodEntry, "id" | "timestamp">): MoodEntry {
  const entries = getMoodEntries();
  const existingIndex = entries.findIndex((e) => e.date === entryData.date);

  const timestamp = Date.now();
  let updatedEntry: MoodEntry;

  if (existingIndex >= 0) {
    // Update existing entry for that date
    updatedEntry = {
      ...entries[existingIndex],
      moodValue: entryData.moodValue,
      note: entryData.note?.trim(),
      tags: entryData.tags || [],
      timestamp, // Update log timestamp to reflect the edit
    };
    entries[existingIndex] = updatedEntry;
  } else {
    // Create new entry
    updatedEntry = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      date: entryData.date,
      moodValue: entryData.moodValue,
      note: entryData.note?.trim(),
      tags: entryData.tags || [],
      timestamp,
    };
    entries.push(updatedEntry);
  }

  if (isBrowser()) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
      console.error("Failed to save mood entries:", error);
    }
  }

  return updatedEntry;
}

/**
 * Deletes a mood entry by ID.
 */
export function deleteMoodEntry(id: string): MoodEntry[] {
  const entries = getMoodEntries();
  const filtered = entries.filter((e) => e.id !== id);

  if (isBrowser()) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error("Failed to delete mood entry:", error);
    }
  }

  return filtered;
}

/**
 * Computes statistics (average, counts, distribution) for a list of entries.
 */
export function getMoodStats(entries: MoodEntry[]): MoodStats {
  if (entries.length === 0) {
    return {
      average: 0,
      count: 0,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
    };
  }

  let totalSum = 0;
  const distribution: Record<MoodValue, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

  entries.forEach((entry) => {
    totalSum += entry.moodValue;
    distribution[entry.moodValue] = (distribution[entry.moodValue] || 0) + 1;
  });

  return {
    average: parseFloat((totalSum / entries.length).toFixed(1)),
    count: entries.length,
    distribution,
  };
}

/**
 * Returns filtered mood entries for the last N days.
 */
export function getEntriesForDays(entries: MoodEntry[], days: number): MoodEntry[] {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  cutoffDate.setHours(0, 0, 0, 0);

  return entries.filter((entry) => new Date(entry.date) >= cutoffDate);
}

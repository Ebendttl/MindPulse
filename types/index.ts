export type MoodValue = 1 | 2 | 3 | 4 | 5 | 6;

export interface MoodType {
  value: MoodValue;
  label: string;
  emoji: string;
  description: string;
  colorName: string;
  bgLight: string;
  bgDark: string;
  borderLight: string;
  borderDark: string;
  textLight: string;
  textDark: string;
  hex: string;
}

export interface MoodEntry {
  id: string;
  date: string; // YYYY-MM-DD
  timestamp: number; // exact log time
  moodValue: MoodValue;
  note?: string; // Optional short text note (max 200 chars)
  tags?: string[]; // Optional context tags (Sleep, Work, etc.)
}

export interface MoodStats {
  average: number;
  count: number;
  distribution: Record<MoodValue, number>;
}

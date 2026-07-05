import { MoodType, MoodValue } from "@/types";

export const MOODS: Record<MoodValue, MoodType> = {
  6: {
    value: 6,
    label: "Great",
    emoji: "🌟",
    color: "bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100 active:bg-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-900/50 dark:text-indigo-300",
    description: "Radiant & energized",
  },
  5: {
    value: 5,
    label: "Peaceful",
    emoji: "😌",
    color: "bg-teal-50 border-teal-200 text-teal-700 hover:bg-teal-100 active:bg-teal-200 dark:bg-teal-950/30 dark:border-teal-900/50 dark:text-teal-300",
    description: "Calm & relaxed",
  },
  4: {
    value: 4,
    label: "Good",
    emoji: "😊",
    color: "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 active:bg-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900/50 dark:text-emerald-300",
    description: "Happy & content",
  },
  3: {
    value: 3,
    label: "Okay",
    emoji: "😐",
    color: "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 active:bg-slate-200 dark:bg-slate-900/40 dark:border-slate-800 dark:text-slate-300",
    description: "Neutral & balanced",
  },
  2: {
    value: 2,
    label: "Low",
    emoji: "😔",
    color: "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 active:bg-amber-200 dark:bg-amber-950/30 dark:border-amber-900/50 dark:text-amber-300",
    description: "Feeling down or tired",
  },
  1: {
    value: 1,
    label: "Struggling",
    emoji: "😫",
    color: "bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100 active:bg-rose-200 dark:bg-rose-950/30 dark:border-rose-900/50 dark:text-rose-300",
    description: "Having a hard time",
  },
};

export const MOOD_LIST = Object.values(MOODS).sort((a, b) => b.value - a.value);

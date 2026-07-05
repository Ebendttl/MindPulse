import { MoodType, MoodValue } from "@/types";

export const MOODS: Record<MoodValue, MoodType> = {
  6: {
    value: 6,
    label: "Great",
    emoji: "🤩",
    description: "Radiant & energized",
    colorName: "amber",
    bgLight: "bg-amber-50/80",
    bgDark: "bg-amber-950/20",
    borderLight: "border-amber-200/50",
    borderDark: "border-amber-900/40",
    textLight: "text-amber-700",
    textDark: "text-amber-300",
    hex: "#F59E0B", // amber-500
  },
  5: {
    value: 5,
    label: "Peaceful",
    emoji: "😌",
    description: "Calm & relaxed",
    colorName: "teal",
    bgLight: "bg-teal-50/80",
    bgDark: "bg-teal-950/20",
    borderLight: "border-teal-200/50",
    borderDark: "border-teal-900/40",
    textLight: "text-teal-700",
    textDark: "text-teal-300",
    hex: "#14B8A6", // teal-500
  },
  4: {
    value: 4,
    label: "Good",
    emoji: "🙂",
    description: "Happy & content",
    colorName: "emerald",
    bgLight: "bg-emerald-50/80",
    bgDark: "bg-emerald-950/20",
    borderLight: "border-emerald-200/50",
    borderDark: "border-emerald-900/40",
    textLight: "text-emerald-700",
    textDark: "text-emerald-300",
    hex: "#10B981", // emerald-500
  },
  3: {
    value: 3,
    label: "Okay",
    emoji: "😐",
    description: "Neutral & balanced",
    colorName: "yellow",
    bgLight: "bg-yellow-50/80",
    bgDark: "bg-yellow-950/20",
    borderLight: "border-yellow-200/50",
    borderDark: "border-yellow-900/40",
    textLight: "text-yellow-700",
    textDark: "text-yellow-300",
    hex: "#EAB308", // yellow-500
  },
  2: {
    value: 2,
    label: "Low",
    emoji: "😔",
    description: "Feeling down or tired",
    colorName: "orange",
    bgLight: "bg-orange-50/80",
    bgDark: "bg-orange-950/20",
    borderLight: "border-orange-200/50",
    borderDark: "border-orange-900/40",
    textLight: "text-orange-700",
    textDark: "text-orange-300",
    hex: "#F97316", // orange-500
  },
  1: {
    value: 1,
    label: "Struggling",
    emoji: "😭",
    description: "Having a hard time",
    colorName: "rose",
    bgLight: "bg-rose-50/80",
    bgDark: "bg-rose-950/20",
    borderLight: "border-rose-200/50",
    borderDark: "border-rose-900/40",
    textLight: "text-rose-700",
    textDark: "text-rose-300",
    hex: "#F43F5E", // rose-500
  },
};

export const MOOD_LIST = Object.values(MOODS).sort((a, b) => b.value - a.value);

"use client";

import React from "react";
import { MoodValue } from "@/types";
import { MOOD_LIST } from "@/lib/moodData";

interface MoodPickerProps {
  selectedMood: MoodValue | null;
  onSelectMood: (value: MoodValue) => void;
}

interface MoodStyle {
  unselected: string;
  selected: string;
  glow: string;
}

const MOOD_STYLES: Record<MoodValue, MoodStyle> = {
  6: { // Great = warm gold/amber
    unselected: "bg-amber-50/30 border-amber-100/40 hover:bg-amber-50/60 hover:border-amber-200/60 text-slate-700 dark:bg-amber-950/10 dark:border-amber-950/20 dark:text-slate-300 dark:hover:bg-amber-950/20 dark:hover:border-amber-900/30",
    selected: "bg-amber-100/90 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100 font-bold",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.25)] ring-2 ring-amber-500 dark:ring-amber-500/80 scale-105"
  },
  5: { // Peaceful = teal/seafoam
    unselected: "bg-teal-50/30 border-teal-100/40 hover:bg-teal-50/60 hover:border-teal-200/60 text-slate-700 dark:bg-teal-950/10 dark:border-teal-950/20 dark:text-slate-300 dark:hover:bg-teal-950/20 dark:hover:border-teal-900/30",
    selected: "bg-teal-100/90 dark:bg-teal-950/40 border-teal-300 dark:border-teal-800 text-teal-950 dark:text-teal-100 font-bold",
    glow: "shadow-[0_0_20px_rgba(20,184,166,0.25)] ring-2 ring-teal-500 dark:ring-teal-500/80 scale-105"
  },
  4: { // Good = soft green
    unselected: "bg-emerald-50/30 border-emerald-100/40 hover:bg-emerald-50/60 hover:border-emerald-200/60 text-slate-700 dark:bg-emerald-950/10 dark:border-emerald-950/20 dark:text-slate-300 dark:hover:bg-emerald-950/20 dark:hover:border-emerald-900/30",
    selected: "bg-emerald-100/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100 font-bold",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.25)] ring-2 ring-emerald-500 dark:ring-emerald-500/80 scale-105"
  },
  3: { // Okay = soft yellow
    unselected: "bg-yellow-50/30 border-yellow-100/40 hover:bg-yellow-50/60 hover:border-yellow-200/60 text-slate-700 dark:bg-yellow-950/10 dark:border-yellow-950/20 dark:text-slate-300 dark:hover:bg-yellow-950/20 dark:hover:border-yellow-900/30",
    selected: "bg-yellow-100/90 dark:bg-yellow-950/40 border-yellow-300 dark:border-yellow-800 text-yellow-950 dark:text-yellow-100 font-bold",
    glow: "shadow-[0_0_20px_rgba(234,179,8,0.25)] ring-2 ring-yellow-500 dark:ring-yellow-500/80 scale-105"
  },
  2: { // Low = muted orange
    unselected: "bg-orange-50/30 border-orange-100/40 hover:bg-orange-50/60 hover:border-orange-200/60 text-slate-700 dark:bg-orange-950/10 dark:border-orange-950/20 dark:text-slate-300 dark:hover:bg-orange-950/20 dark:hover:border-orange-900/30",
    selected: "bg-orange-100/90 dark:bg-orange-950/40 border-orange-300 dark:border-orange-800 text-orange-950 dark:text-orange-100 font-bold",
    glow: "shadow-[0_0_20px_rgba(249,115,22,0.25)] ring-2 ring-orange-500 dark:ring-orange-500/80 scale-105"
  },
  1: { // Struggling = dusty rose/red
    unselected: "bg-rose-50/30 border-rose-100/40 hover:bg-rose-50/60 hover:border-rose-200/60 text-slate-700 dark:bg-rose-950/10 dark:border-rose-950/20 dark:text-slate-300 dark:hover:bg-rose-950/20 dark:hover:border-rose-900/30",
    selected: "bg-rose-100/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100 font-bold",
    glow: "shadow-[0_0_20px_rgba(244,63,94,0.25)] ring-2 ring-rose-500 dark:ring-rose-500/80 scale-105"
  }
};

export default function MoodPicker({ selectedMood, onSelectMood }: MoodPickerProps) {
  return (
    <div className="w-full">
      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider text-center sm:text-left">
        How is your mind feeling today?
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {MOOD_LIST.map((mood) => {
          const isSelected = selectedMood === mood.value;
          const styles = MOOD_STYLES[mood.value];

          const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelectMood(mood.value);
            }
          };

          return (
            <button
              key={mood.value}
              type="button"
              onClick={() => onSelectMood(mood.value)}
              onKeyDown={handleKeyDown}
              aria-label={`Select mood: ${mood.label}`}
              aria-pressed={isSelected}
              className={`flex flex-col items-center justify-center p-4 rounded-[20px] border transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
                isSelected
                  ? `${styles.selected} ${styles.glow} dark:ring-offset-slate-900`
                  : `${styles.unselected} focus-visible:border-slate-300`
              }`}
            >
              <span
                className={`text-3xl sm:text-4xl mb-2 select-none transition-transform duration-300 ${
                  isSelected ? "animate-bounce" : "group-hover:scale-110"
                }`}
                role="img"
                aria-hidden="true"
              >
                {mood.emoji}
              </span>
              <span className="text-xs font-bold tracking-tight">{mood.label}</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 hidden sm:block text-center font-medium leading-tight">
                {mood.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

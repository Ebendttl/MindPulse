"use client";

import React from "react";
import { MoodValue } from "@/types";
import { MOOD_LIST } from "@/lib/moodData";

interface MoodPickerProps {
  selectedMood: MoodValue | null;
  onSelectMood: (value: MoodValue) => void;
}

const GLOW_SHADOWS: Record<MoodValue, string> = {
  6: "shadow-[0_0_20px_rgba(99,102,241,0.4)] ring-2 ring-indigo-500 dark:ring-indigo-400",
  5: "shadow-[0_0_20px_rgba(20,184,166,0.4)] ring-2 ring-teal-500 dark:ring-teal-400",
  4: "shadow-[0_0_20px_rgba(16,185,129,0.4)] ring-2 ring-emerald-500 dark:ring-emerald-400",
  3: "shadow-[0_0_20px_rgba(148,163,184,0.4)] ring-2 ring-slate-400 dark:ring-slate-500",
  2: "shadow-[0_0_20px_rgba(245,158,11,0.4)] ring-2 ring-amber-500 dark:ring-amber-400",
  1: "shadow-[0_0_20px_rgba(244,63,94,0.4)] ring-2 ring-rose-500 dark:ring-rose-400",
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
          const activeGlow = GLOW_SHADOWS[mood.value];

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
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
                isSelected
                  ? `${mood.color} ${activeGlow} dark:ring-offset-slate-900 scale-105`
                  : "bg-white border-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-50/50 hover:shadow-sm dark:bg-slate-900/60 dark:border-slate-800/80 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800/50 focus-visible:border-slate-300"
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
              <span className="text-xs font-semibold tracking-tight">{mood.label}</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 hidden sm:block text-center font-normal leading-tight">
                {mood.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

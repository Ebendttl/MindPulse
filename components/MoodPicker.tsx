"use client";

import React from "react";
import { MoodValue } from "@/types";
import { MOOD_LIST } from "@/lib/moodData";

interface MoodPickerProps {
  selectedMood: MoodValue | null;
  onSelectMood: (value: MoodValue) => void;
}

export default function MoodPicker({ selectedMood, onSelectMood }: MoodPickerProps) {
  return (
    <div className="w-full">
      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider text-center sm:text-left">
        How is your mind feeling today?
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {MOOD_LIST.map((mood) => {
          const isSelected = selectedMood === mood.value;
          return (
            <button
              key={mood.value}
              type="button"
              onClick={() => onSelectMood(mood.value)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${
                isSelected
                  ? `${mood.color} ring-2 ring-offset-2 ring-indigo-500 dark:ring-offset-slate-900 scale-105 shadow-md`
                  : "bg-white border-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-50/50 hover:shadow-sm dark:bg-slate-900/60 dark:border-slate-800/80 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800/50"
              }`}
            >
              <span
                className={`text-3xl sm:text-4xl mb-2 select-none transition-transform duration-300 ${
                  isSelected ? "animate-bounce" : "group-hover:scale-110"
                }`}
                role="img"
                aria-label={mood.label}
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

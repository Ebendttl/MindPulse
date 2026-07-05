"use client";

import React from "react";
import { MoodValue } from "@/types";
import { MOOD_LIST } from "@/lib/moodData";
import { MOOD_COLORS, MOOD_COLORS_DARK } from "@/lib/moodColors";

interface MoodPickerProps {
  selectedMood: MoodValue | null;
  onSelectMood: (value: MoodValue) => void;
}

export default function MoodPicker({ selectedMood, onSelectMood }: MoodPickerProps) {
  return (
    <div className="w-full">
      <h3
        className="text-xs font-semibold uppercase tracking-[0.05em] mb-3 text-center sm:text-left"
        style={{ color: "var(--text-secondary)" }}
      >
        How is your mind feeling today?
      </h3>
      {/* MOOD_LIST is sorted ascending: 1 Struggling → 6 Great */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {MOOD_LIST.map((mood) => {
          const isSelected = selectedMood === mood.value;
          const colors = MOOD_COLORS[mood.value];
          const darkColors = MOOD_COLORS_DARK[mood.value];

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
              className="flex flex-col items-center justify-center p-4 rounded-[20px] border transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                // Default state
                backgroundColor: isSelected ? colors.base : colors.tint,
                borderColor: isSelected
                  ? "transparent"
                  : `${colors.base}4D`, // 30% opacity hex suffix
                color: isSelected ? "#FFFDF8" : colors.text,
                // Selected glow ring
                boxShadow: isSelected
                  ? `0 0 0 3px ${colors.base}66, 0 8px 20px ${colors.base}26`
                  : "none",
                // Hover handled below via CSS class but inline for selected/deselected shift
                transform: isSelected ? "translateY(-2px)" : undefined,
                // Focus ring color
                // @ts-expect-error CSS custom properties
                "--tw-ring-color": "#6C63FF",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.borderColor = `${colors.base}99`; // 60%
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 20px ${colors.base}26`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.borderColor = `${colors.base}4D`; // 30%
                  (e.currentTarget as HTMLElement).style.transform = "none";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }
              }}
            >
              <span
                className="text-3xl sm:text-4xl mb-2 select-none transition-transform duration-200"
                style={{
                  transform: isSelected ? "scale(1.15)" : "scale(1)",
                }}
                role="img"
                aria-hidden="true"
              >
                {mood.emoji}
              </span>
              <span className="text-xs font-bold tracking-tight">
                {mood.label}
              </span>
              <span
                className="text-[10px] mt-1 hidden sm:block text-center font-medium leading-tight"
                style={{
                  color: isSelected ? "rgba(255,255,255,0.85)" : colors.text,
                  opacity: isSelected ? 0.9 : 0.75,
                }}
              >
                {mood.description}
              </span>

              {/* Dark mode override layer — applied via CSS class when .dark ancestor exists */}
              <style jsx>{`
                .dark button[data-mood="${mood.value}"] {
                  background-color: ${isSelected ? colors.base : darkColors.tint} !important;
                  border-color: ${isSelected ? "transparent" : darkColors.border} !important;
                  color: ${isSelected ? "#FFFDF8" : darkColors.text} !important;
                }
              `}</style>
            </button>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { MoodValue } from "@/types";
import { MOOD_LIST } from "@/lib/moodData";
import { MOOD_COLORS, MOOD_COLORS_DARK } from "@/lib/moodColors";

interface MoodPickerProps {
  selectedMood: MoodValue | null;
  onSelectMood: (value: MoodValue) => void;
}

/**
 * Helper: detect if dark mode is active by checking the <html> element.
 * Called on render — lightweight since it's a single classList check.
 */
function isDarkMode(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

export default function MoodPicker({ selectedMood, onSelectMood }: MoodPickerProps) {
  const dark = isDarkMode();

  return (
    <div className="w-full">
      <h3
        className="text-xs font-semibold uppercase mb-3 text-center sm:text-left"
        style={{ letterSpacing: "0.05em", color: "var(--text-secondary)" }}
      >
        How is your mind feeling today?
      </h3>
      {/* MOOD_LIST is sorted ascending: 1 Struggling → 6 Great */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {MOOD_LIST.map((mood) => {
          const isSelected = selectedMood === mood.value;
          const colors = MOOD_COLORS[mood.value];
          const darkColors = MOOD_COLORS_DARK[mood.value];

          // Compute colors based on dark mode and selection state
          const bgColor = isSelected
            ? colors.base
            : dark ? darkColors.tint : colors.tint;
          const borderColor = isSelected
            ? "transparent"
            : dark ? darkColors.border : `${colors.base}4D`; // 30% opacity
          const textColor = isSelected
            ? "#FFFDF8"
            : dark ? darkColors.text : colors.text;
          const descColor = isSelected
            ? "rgba(255,255,255,0.85)"
            : dark ? `${darkColors.text}BF` : `${colors.text}BF`; // 75% opacity

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
              className="flex flex-col items-center justify-center p-4 rounded-[20px] transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                backgroundColor: bgColor,
                border: `1px solid ${borderColor}`,
                color: textColor,
                boxShadow: isSelected
                  ? `0 0 0 3px ${colors.base}66, 0 8px 20px ${colors.base}26`
                  : "none",
                transform: isSelected ? "translateY(-2px)" : undefined,
                // @ts-expect-error CSS custom properties for focus ring
                "--tw-ring-color": "#6C63FF",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = dark ? `${colors.base}66` : `${colors.base}99`;
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = `0 8px 20px ${colors.base}26`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = borderColor;
                  el.style.transform = "none";
                  el.style.boxShadow = "none";
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
                style={{ color: descColor }}
              >
                {mood.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

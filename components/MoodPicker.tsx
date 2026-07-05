"use client";

import React, { useEffect } from "react";
import { MoodValue } from "@/types";
import { MOOD_LIST } from "@/lib/moodData";
import { MOOD_COLORS } from "@/lib/moodColors";

interface MoodPickerProps {
  selectedMood: MoodValue | null;
  onSelectMood: (value: MoodValue) => void;
}

export default function MoodPicker({ selectedMood, onSelectMood }: MoodPickerProps) {
  // Print/log the array order to console on load in dev mode for verification
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("MindPulse Mood Array Order Verification:", MOOD_LIST.map((m) => `${m.value}: ${m.label}`));
    }
  }, []);

  return (
    <div className="w-full">
      <h3
        className="text-xs font-semibold uppercase mb-3 text-center sm:text-left"
        style={{ letterSpacing: "0.05em", color: "var(--text-secondary)" }}
      >
        How is your mind feeling today?
      </h3>
      {/* Grid adapts layout to fit 24px padding on all screen sizes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {MOOD_LIST.map((mood) => {
          const isSelected = selectedMood === mood.value;
          const colors = MOOD_COLORS[mood.value];

          // CARD ELEVATION SYSTEM:
          // Unselected: uses the card surface token, card border, card shadow
          // Selected: uses the mood base color, border is transparent, shadow is elevated
          const bgColor = isSelected
            ? colors.base
            : "var(--card)";
          const borderColor = isSelected
            ? "transparent"
            : "var(--card-border)";
          const shadowStyle = isSelected
            ? `0 6px 16px ${colors.base}4D` // Glowing shadow when selected
            : "var(--card-shadow)";
          const textColor = isSelected
            ? "#FFFFFF"
            : "var(--text-primary)";
          const descColor = isSelected
            ? "rgba(255, 255, 255, 0.85)"
            : "var(--text-secondary)";

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
              className="flex flex-col items-center justify-center p-6 rounded-[20px] border transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                backgroundColor: bgColor,
                borderColor: borderColor,
                boxShadow: shadowStyle,
                color: textColor,
                transform: isSelected ? "translateY(-4px)" : undefined,
                // @ts-expect-error CSS custom properties for focus ring
                "--tw-ring-color": "#6C63FF",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--card-border-hover)";
                  el.style.boxShadow = "var(--card-shadow-hover)";
                  el.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = borderColor;
                  el.style.boxShadow = shadowStyle;
                  el.style.transform = "none";
                }
              }}
            >
              <span
                className="text-3xl sm:text-4xl mb-2.5 select-none transition-transform duration-300"
                style={{
                  transform: isSelected ? "scale(1.15)" : "scale(1)",
                }}
                role="img"
                aria-hidden="true"
              >
                {mood.emoji}
              </span>
              <span className="text-xs font-black tracking-tight uppercase">
                {mood.label}
              </span>
              <span
                className="text-[10px] mt-1.5 font-bold leading-tight text-center"
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

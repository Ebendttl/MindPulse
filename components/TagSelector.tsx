"use client";

import React from "react";
import { Smile, Briefcase, Zap, Users, HeartPulse, CloudSun } from "lucide-react";

interface TagSelectorProps {
  selectedTags: string[];
  onChangeTags: (tags: string[]) => void;
}

interface TagOption {
  name: string;
  emoji: string;
  icon: React.ReactNode;
  activeColor: string;    // base accent color hex
  activeBg: string;       // light tint bg hex
  activeText: string;     // text color hex
}

const TAG_OPTIONS: TagOption[] = [
  {
    name: "Sleep",
    emoji: "😴",
    icon: <Smile className="w-3.5 h-3.5" />,
    activeColor: "#6FBBB0",
    activeBg: "#E9F5F3",
    activeText: "#2A6058",
  },
  {
    name: "Work",
    emoji: "💼",
    icon: <Briefcase className="w-3.5 h-3.5" />,
    activeColor: "#F0A868",
    activeBg: "#FDF3E9",
    activeText: "#8F5A22",
  },
  {
    name: "Exercise",
    emoji: "🏃",
    icon: <Zap className="w-3.5 h-3.5" />,
    activeColor: "#8FC97E",
    activeBg: "#EFF7ED",
    activeText: "#3F6E33",
  },
  {
    name: "Social",
    emoji: "👥",
    icon: <Users className="w-3.5 h-3.5" />,
    activeColor: "#6C63FF",
    activeBg: "#EEEDFF",
    activeText: "#3D37B0",
  },
  {
    name: "Health",
    emoji: "🏥",
    icon: <HeartPulse className="w-3.5 h-3.5" />,
    activeColor: "#E8837A",
    activeBg: "#FDF0EE",
    activeText: "#8C3A32",
  },
  {
    name: "Weather",
    emoji: "☀️",
    icon: <CloudSun className="w-3.5 h-3.5" />,
    activeColor: "#E0B84F",
    activeBg: "#FDF6E3",
    activeText: "#7A5F1A",
  },
];

export default function TagSelector({ selectedTags, onChangeTags }: TagSelectorProps) {
  const handleToggleTag = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      onChangeTags(selectedTags.filter((t) => t !== tagName));
    } else {
      onChangeTags([...selectedTags, tagName]);
    }
  };

  return (
    <div className="w-full">
      <h3
        className="text-xs font-semibold uppercase mb-2.5 text-center sm:text-left"
        style={{ letterSpacing: "0.05em", color: "var(--text-secondary)" }}
      >
        Context Tags (select all that apply)
      </h3>
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        {TAG_OPTIONS.map((tag) => {
          const isSelected = selectedTags.includes(tag.name);

          const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleToggleTag(tag.name);
            }
          };

          return (
            <button
              key={tag.name}
              type="button"
              onClick={() => handleToggleTag(tag.name)}
              onKeyDown={handleKeyDown}
              aria-label={`Toggle tag: ${tag.name}`}
              aria-pressed={isSelected}
              className="flex items-center gap-1.5 py-[6px] px-[14px] rounded-full border text-[13px] font-black uppercase tracking-tight cursor-pointer transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                backgroundColor: isSelected ? tag.activeBg : "var(--card)",
                borderColor: isSelected ? `${tag.activeColor}66` : "var(--card-border)",
                color: isSelected ? tag.activeText : "var(--text-secondary)",
                transform: isSelected ? "scale(1.03)" : undefined,
                boxShadow: isSelected ? `0 2px 6px ${tag.activeColor}33` : "var(--card-shadow)",
                // @ts-expect-error CSS custom properties
                "--tw-ring-color": "#6C63FF",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--card-border-hover)";
                  el.style.boxShadow = "var(--card-shadow-hover)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--card-border)";
                  el.style.boxShadow = "var(--card-shadow)";
                }
              }}
            >
              <span className="text-[14px]" role="img" aria-hidden="true">
                {tag.emoji}
              </span>
              <span>{tag.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

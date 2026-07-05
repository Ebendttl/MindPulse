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
  activeColor: string; // Tailwind bg/text when active
}

const TAG_OPTIONS: TagOption[] = [
  {
    name: "Sleep",
    emoji: "😴",
    icon: <Smile className="w-3.5 h-3.5" />,
    activeColor: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/50",
  },
  {
    name: "Work",
    emoji: "💼",
    icon: <Briefcase className="w-3.5 h-3.5" />,
    activeColor: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/50",
  },
  {
    name: "Exercise",
    emoji: "🏃",
    icon: <Zap className="w-3.5 h-3.5" />,
    activeColor: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/50",
  },
  {
    name: "Social",
    emoji: "👥",
    icon: <Users className="w-3.5 h-3.5" />,
    activeColor: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-900/50",
  },
  {
    name: "Health",
    emoji: "🏥",
    icon: <HeartPulse className="w-3.5 h-3.5" />,
    activeColor: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900/50",
  },
  {
    name: "Weather",
    emoji: "☀️",
    icon: <CloudSun className="w-3.5 h-3.5" />,
    activeColor: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-900/50",
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
      <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2.5 text-center sm:text-left">
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold cursor-pointer transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
                isSelected
                  ? `${tag.activeColor} ring-1 scale-[1.03] shadow-sm`
                  : "bg-white border-slate-100 text-slate-500 hover:border-slate-300 hover:bg-slate-50/50 dark:bg-slate-900/40 dark:border-slate-800/80 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-800/50"
              }`}
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

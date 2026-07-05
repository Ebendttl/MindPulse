"use client";

import React, { useMemo } from "react";
import { MoodEntry } from "@/types";
import { getCorrelationInsight } from "@/lib/insights";
import { BRAND } from "@/lib/moodColors";
import { calculateStreak } from "@/lib/streak";
import { BrainCircuit, Info, Sparkles, Activity } from "lucide-react";
import { BreathingCircleIllustration } from "./MindfulIllustration";

interface InsightsCardProps {
  entries: MoodEntry[];
}

const WELLNESS_PROMPTS = [
  "Try naming one thing you're grateful for today.",
  "A 5-minute walk can reset your mood and refresh your perspective.",
  "Drink a glass of water to hydrate your mind and body.",
  "Take three deep, conscious breaths right now to ground yourself.",
  "Reach out to a friend or loved one for a quick, uplifting chat.",
  "Disconnect from screens for the next 15 minutes to reduce cognitive fatigue.",
  "Write down one small, simple task you want to accomplish today.",
  "Give yourself credit for showing up today. You're doing great.",
  "Listen to a favorite song that brings you peace, nostalgia, or joy.",
  "Notice three distinct sounds around you right now for a mindful check-in."
];

export default function InsightsCard({ entries }: InsightsCardProps) {
  const correlationInsight = useMemo(() => {
    return getCorrelationInsight(entries);
  }, [entries]);

  // Compute daily rotating prompt
  const currentTip = useMemo(() => {
    const today = new Date();
    const promptIndex = (today.getFullYear() + today.getMonth() + today.getDate()) % WELLNESS_PROMPTS.length;
    return WELLNESS_PROMPTS[promptIndex];
  }, []);

  // Compute total tags used
  const totalTagsUsed = useMemo(() => {
    const uniqueTags = new Set<string>();
    entries.forEach((e) => e.tags?.forEach((t) => uniqueTags.add(t)));
    return uniqueTags.size;
  }, [entries]);

  // Compute logging streak
  const streak = useMemo(() => calculateStreak(entries), [entries]);

  // Compute secondary insight (Best Tag Association)
  const bestTagInfo = useMemo(() => {
    if (entries.length < 5) return null;
    const tagSums = new Map<string, number>();
    const tagCounts = new Map<string, number>();

    entries.forEach((entry) => {
      if (!entry.tags) return;
      entry.tags.forEach((tag) => {
        tagSums.set(tag, (tagSums.get(tag) || 0) + entry.moodValue);
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });

    if (tagSums.size === 0) return null;

    let bestTag = "";
    let highestAvg = 0;
    let bestCount = 0;

    tagSums.forEach((sum, tag) => {
      const count = tagCounts.get(tag) || 1;
      const avg = sum / count;
      if (avg > highestAvg || (avg === highestAvg && count > bestCount)) {
        highestAvg = avg;
        bestTag = tag;
        bestCount = count;
      }
    });

    return bestTag ? { tag: bestTag, avg: highestAvg.toFixed(1) } : null;
  }, [entries]);

  return (
    <div
      className="rounded-[20px] p-6 transition-all duration-300 w-full border h-full flex flex-col justify-between"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--card-border)",
        boxShadow: "var(--card-shadow)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--card-border-hover)";
        el.style.boxShadow = "var(--card-shadow-hover)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--card-border)";
        el.style.boxShadow = "var(--card-shadow)";
      }}
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BrainCircuit className="w-5 h-5" style={{ color: BRAND.primaryEnd }} />
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>MindPulse Insights</h2>
        </div>
      </div>

      {/* Primary Content (Flex Growing Area) */}
      <div className="flex-grow flex flex-col justify-center">
        {correlationInsight ? (
          <div className="space-y-4">
            {/* Main Correlation Card */}
            <div
              className="rounded-[20px] p-5 flex gap-4 items-start border"
              style={{
                backgroundColor: `${BRAND.primaryEnd}0D`, // 5% opacity
                borderColor: `${BRAND.primaryEnd}26`, // 15% opacity
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: `${BRAND.primaryEnd}1A`, // 10% opacity
                  color: BRAND.primaryEnd,
                  borderColor: `${BRAND.primaryEnd}33`,
                }}
              >
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h3
                  className="text-xs font-black uppercase mb-1 tracking-wider"
                  style={{
                    color: BRAND.primaryEnd,
                  }}
                >
                  Active Correlation
                </h3>
                <p className="text-sm leading-relaxed font-bold" style={{ color: "var(--text-primary)" }}>
                  {correlationInsight}
                </p>
              </div>
            </div>

            {/* Secondary Insight Card: Best Tag Association */}
            {bestTagInfo && (
              <div
                className="rounded-[20px] p-5 flex gap-4 items-start border animate-fade-in"
                style={{
                  backgroundColor: `${BRAND.primary}0D`, // 5% opacity
                  borderColor: `${BRAND.primary}26`, // 15% opacity
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border"
                  style={{
                    backgroundColor: `${BRAND.primary}1A`, // 10% opacity
                    color: BRAND.primary,
                    borderColor: `${BRAND.primary}33`,
                  }}
                >
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3
                    className="text-xs font-black uppercase mb-1 tracking-wider"
                    style={{
                      color: BRAND.primary,
                    }}
                  >
                    Optimal Context Tag
                  </h3>
                  <p className="text-sm leading-relaxed font-bold" style={{ color: "var(--text-primary)" }}>
                    You tend to log your highest moods when associating with tag <span className="underline decoration-wavy decoration-[#6C63FF] px-1 font-black">#{bestTagInfo.tag.toUpperCase()}</span> (Average mood rating of {bestTagInfo.avg}/6.0).
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-4 flex-1">
            <BreathingCircleIllustration />
            <p className="text-sm font-bold mb-1 mt-2" style={{ color: "var(--text-primary)" }}>
              Building your cognitive patterns...
            </p>
            <p className="text-xs max-w-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              We need at least 5 logs to surface interesting correlations. Currently logged: <span className="font-black text-[#6C63FF]">{entries.length}/5</span> reflections.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Section (Tip & Progress stats) */}
      <div className="mt-6 space-y-4">
        {/* Today's Focus tip */}
        <div
          className="rounded-[15px] p-4 flex gap-3 items-start border"
          style={{
            backgroundColor: "var(--background)",
            borderColor: "var(--card-border)",
          }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 border"
            style={{
              backgroundColor: "rgba(78, 205, 196, 0.1)",
              borderColor: "rgba(78, 205, 196, 0.25)",
              color: "#4ECDC4",
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-wider mb-0.5" style={{ color: "#4ECDC4" }}>
              Today&apos;s Focus
            </h4>
            <p className="text-xs font-semibold leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {currentTip}
            </p>
          </div>
        </div>

        {/* Mini stats row */}
        <div className="pt-4 border-t flex justify-between gap-4" style={{ borderColor: "var(--card-border)" }}>
          <div className="flex-1 flex flex-col items-center p-2.5 rounded-xl border bg-black/5 dark:bg-white/5" style={{ borderColor: "var(--card-border)" }}>
            <span className="text-[10px] font-black uppercase tracking-wider opacity-60" style={{ color: "var(--text-secondary)" }}>Total Logs</span>
            <span className="text-sm font-black mt-0.5" style={{ color: "var(--text-primary)" }}>{entries.length}</span>
          </div>
          <div className="flex-1 flex flex-col items-center p-2.5 rounded-xl border bg-black/5 dark:bg-white/5" style={{ borderColor: "var(--card-border)" }}>
            <span className="text-[10px] font-black uppercase tracking-wider opacity-60" style={{ color: "var(--text-secondary)" }}>Tags Used</span>
            <span className="text-sm font-black mt-0.5" style={{ color: "var(--text-primary)" }}>{totalTagsUsed}</span>
          </div>
          <div className="flex-1 flex flex-col items-center p-2.5 rounded-xl border bg-black/5 dark:bg-white/5" style={{ borderColor: "var(--card-border)" }}>
            <span className="text-[10px] font-black uppercase tracking-wider opacity-60" style={{ color: "var(--text-secondary)" }}>Streak</span>
            <span className="text-sm font-black mt-0.5" style={{ color: "var(--text-primary)" }}>{streak} {streak === 1 ? "day" : "days"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

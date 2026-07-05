"use client";

import React, { useMemo } from "react";
import { MoodEntry } from "@/types";
import { getCorrelationInsight } from "@/lib/insights";
import { BRAND } from "@/lib/moodColors";
import { BrainCircuit, Info } from "lucide-react";
import { BreathingCircleIllustration } from "./MindfulIllustration";

interface InsightsCardProps {
  entries: MoodEntry[];
}

export default function InsightsCard({ entries }: InsightsCardProps) {
  const correlationInsight = useMemo(() => {
    return getCorrelationInsight(entries);
  }, [entries]);

  return (
    <div
      className="rounded-[20px] p-6 transition-all duration-300 w-full border"
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
      <div className="flex items-center gap-2 mb-4">
        <BrainCircuit className="w-5 h-5" style={{ color: BRAND.primaryEnd }} />
        <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>MindPulse Insights</h2>
      </div>

      {correlationInsight ? (
        <div
          className="rounded-[20px] p-6 flex gap-4 items-start border"
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
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <BreathingCircleIllustration />
          <p className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            Not enough data yet
          </p>
          <p className="text-xs max-w-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Continue logging your daily moods and tags. Once you have at least 5 logs, we will surface interesting correlations about your well-being.
          </p>
        </div>
      )}
    </div>
  );
}

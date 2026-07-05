"use client";

import React, { useMemo } from "react";
import { MoodEntry } from "@/types";
import { getCorrelationInsight } from "@/lib/insights";
import { BrainCircuit, Info } from "lucide-react";
import MindfulIllustration from "./MindfulIllustration";

interface InsightsCardProps {
  entries: MoodEntry[];
}

export default function InsightsCard({ entries }: InsightsCardProps) {
  const correlationInsight = useMemo(() => {
    return getCorrelationInsight(entries);
  }, [entries]);

  return (
    <div className="w-full bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-4">
        <BrainCircuit className="w-5 h-5 text-indigo-500" />
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">MindPulse Insights</h2>
      </div>

      {correlationInsight ? (
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/40 rounded-2xl p-4 flex gap-3.5 items-start">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider mb-1">
              Active Correlation
            </h3>
            <p className="text-sm text-indigo-900 dark:text-indigo-200 leading-relaxed font-semibold">
              {correlationInsight}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-3 text-center">
          <MindfulIllustration />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 mt-2">
            Not enough data yet
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
            Continue logging your daily moods and tags. Once you have at least 5 logs, we will surface interesting correlations about your well-being.
          </p>
        </div>
      )}
    </div>
  );
}

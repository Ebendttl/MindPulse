import React, { useMemo } from "react";
import { MoodEntry, MoodValue } from "@/types";
import { getMoodStats } from "@/lib/storage";
import { MOODS } from "@/lib/moodData";
import { calculateStreak } from "@/lib/streak";
import { Heart, Award, Sparkles, Smile } from "lucide-react";

interface StatsSummaryProps {
  entries: MoodEntry[];
}

export default function StatsSummary({ entries }: StatsSummaryProps) {
  const stats = useMemo(() => getMoodStats(entries), [entries]);

  // Determine a text summary of the average mood
  const averageMoodDetails = useMemo(() => {
    const avg = stats.average;
    if (avg === 0) return null;
    
    // Find the closest mood value
    const closestValue = Math.round(avg) as MoodValue;
    return MOODS[closestValue];
  }, [stats.average]);

  // Calculate logging streak (consecutive days) using our lib/streak
  const streak = useMemo(() => calculateStreak(entries), [entries]);

  // SDG 3 Insight Tip
  const wellBeingTip = useMemo(() => {
    if (entries.length === 0) {
      return "Every reflection matters. Log your first mood to begin tracking your wellness journey.";
    }

    const avg = stats.average;
    if (avg >= 5) {
      return "You're feeling wonderful! Share this positive energy with someone today or jot down what made this day so bright.";
    } else if (avg >= 4) {
      return "A peaceful mind leads to a healthy body. Dedicate 10 minutes to deep breathing or a quiet walk to anchor this calmness.";
    } else if (avg >= 3) {
      return "Feeling okay is completely natural. It's a great baseline to focus on gentle physical activity, like light stretching.";
    } else if (avg >= 2) {
      return "Low energy is a signal to slow down. Consider stepping away from screens and enjoying a hot cup of tea or listening to soothing music.";
    } else {
      return "Struggling is okay. Give yourself permission to rest, reach out to a trusted friend or professional, and practice gentle self-compassion.";
    }
  }, [entries, stats.average]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-6">
      {/* Average Mood Card */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center shrink-0">
          <Smile className="w-6 h-6 text-indigo-500" />
        </div>
        <div>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Average Mood
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
              {stats.average > 0 ? stats.average : "—"}
            </span>
            {averageMoodDetails && (
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                ({averageMoodDetails.emoji} {averageMoodDetails.label})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Streak Card */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className={`w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center shrink-0 ${streak > 0 ? "animate-[bounce_2.5s_ease-in-out_infinite] shadow-[0_0_15px_rgba(16,185,129,0.25)]" : ""}`}>
          <Award className="w-6 h-6 text-emerald-500" />
        </div>
        <div>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Logging Streak
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
              {streak} {streak === 1 ? "day" : "days"}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              consecutive
            </span>
          </div>
        </div>
      </div>

      {/* SDG 3 / Wellness Tip Card */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow duration-300 md:col-span-1">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center shrink-0 mt-0.5">
          <Heart className="w-6 h-6 text-rose-500 fill-rose-100 dark:fill-none" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              SDG 3 Well-being Tip
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 font-semibold">
            {wellBeingTip}
          </p>
        </div>
      </div>
    </div>
  );
}

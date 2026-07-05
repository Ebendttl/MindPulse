import React, { useMemo } from "react";
import { MoodEntry, MoodValue } from "@/types";
import { getMoodStats } from "@/lib/storage";
import { MOODS } from "@/lib/moodData";
import { MOOD_COLORS, BRAND } from "@/lib/moodColors";
import { calculateStreak } from "@/lib/streak";
import { Heart, Award, Smile } from "lucide-react";

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

  // The accent color for the average mood card depends on the current average
  const avgAccentColor = useMemo(() => {
    if (stats.average === 0) return "#B0A8B8"; // text-secondary fallback
    const closestValue = Math.round(stats.average) as MoodValue;
    return MOOD_COLORS[closestValue].base;
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
      <div
        className="bg-card border border-card-border rounded-[20px] p-6 flex items-center gap-4 transition-shadow duration-300 hover:shadow-md overflow-hidden relative"
        style={{
          borderLeftWidth: "4px",
          borderLeftColor: avgAccentColor,
        }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
          style={{
            backgroundColor: `${avgAccentColor}26`, // 15% opacity
          }}
        >
          <Smile className="w-6 h-6" style={{ color: avgAccentColor }} />
        </div>
        <div>
          <span
            className="text-xs font-bold uppercase block"
            style={{
              letterSpacing: "0.05em",
              color: "var(--text-secondary)",
              fontSize: "12px",
            }}
          >
            Average Mood
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span
              className="font-black"
              style={{
                fontSize: "28px",
                lineHeight: "1.2",
                color: "var(--text-primary)",
              }}
            >
              {stats.average > 0 ? stats.average : "—"}
            </span>
            {averageMoodDetails && (
              <span
                className="text-xs font-semibold"
                style={{ color: "var(--text-secondary)" }}
              >
                ({averageMoodDetails.emoji} {averageMoodDetails.label})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Streak Card */}
      <div
        className="bg-card border border-card-border rounded-[20px] p-6 flex items-center gap-4 transition-shadow duration-300 hover:shadow-md overflow-hidden relative"
        style={{
          borderLeftWidth: "4px",
          borderLeftColor: BRAND.primary,
        }}
      >
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${streak > 0 ? "animate-[bounce_2.5s_ease-in-out_infinite]" : ""}`}
          style={{
            backgroundColor: `${BRAND.primary}26`, // 15% opacity
          }}
        >
          <Award className="w-6 h-6" style={{ color: BRAND.primary }} />
        </div>
        <div>
          <span
            className="text-xs font-bold uppercase block"
            style={{
              letterSpacing: "0.05em",
              color: "var(--text-secondary)",
              fontSize: "12px",
            }}
          >
            Logging Streak
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span
              className="font-black"
              style={{
                fontSize: "28px",
                lineHeight: "1.2",
                color: "var(--text-primary)",
              }}
            >
              {streak} {streak === 1 ? "day" : "days"}
            </span>
            <span
              className="text-xs font-semibold"
              style={{ color: "var(--text-secondary)" }}
            >
              consecutive
            </span>
          </div>
        </div>
      </div>

      {/* SDG 3 / Wellness Tip Card */}
      <div
        className="bg-card border border-card-border rounded-[20px] p-6 flex items-start gap-4 transition-shadow duration-300 hover:shadow-md overflow-hidden relative md:col-span-1"
        style={{
          borderLeftWidth: "4px",
          borderLeftColor: "#E8837A",
        }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 mt-0.5"
          style={{
            backgroundColor: "rgba(232, 131, 122, 0.15)",
          }}
        >
          <Heart className="w-6 h-6" style={{ color: "#E8837A" }} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            <span
              className="text-xs font-bold uppercase"
              style={{
                letterSpacing: "0.05em",
                color: "var(--text-secondary)",
                fontSize: "12px",
              }}
            >
              SDG 3 Well-being Tip
            </span>
          </div>
          <p
            className="text-xs leading-relaxed font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {wellBeingTip}
          </p>
        </div>
      </div>
    </div>
  );
}

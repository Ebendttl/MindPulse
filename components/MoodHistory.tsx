import React, { useState } from "react";
import { MoodEntry } from "@/types";
import { MOODS } from "@/lib/moodData";
import { MOOD_COLORS } from "@/lib/moodColors";
import { Trash2, Calendar, Search } from "lucide-react";
import { BreathingCircleIllustration } from "./MindfulIllustration";

interface MoodHistoryProps {
  entries: MoodEntry[];
  onDeleteEntry: (id: string) => void;
}

export default function MoodHistory({ entries, onDeleteEntry }: MoodHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEntries = entries.filter((entry) => {
    if (!searchTerm) return true;
    const tagMatch = entry.tags?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
      entry.note?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      MOODS[entry.moodValue]?.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.date.includes(searchTerm) ||
      tagMatch
    );
  });

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full bg-card border border-card-border rounded-[20px] p-6 transition-shadow duration-300 hover:shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-5 h-5" style={{ color: MOOD_COLORS[4].base }} />
            <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Mood History</h2>
          </div>
          <p className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
            An archive of your daily well-being reflections
          </p>
        </div>

        {entries.length > 0 && (
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }} />
            <input
              type="text"
              placeholder="Search notes, moods or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs border bg-background outline-none transition-all duration-200 focus:ring-2 focus:ring-offset-1"
              style={{
                borderColor: "var(--card-border)",
                color: "var(--text-primary)",
                // @ts-expect-error CSS custom properties
                "--tw-ring-color": "#6C63FF40",
              }}
            />
          </div>
        )}
      </div>

      {entries.length === 0 ? (
        <div
          className="text-center rounded-2xl border border-dashed"
          style={{
            backgroundColor: "var(--background)",
            borderColor: "var(--card-border)",
          }}
        >
          <BreathingCircleIllustration />
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
            No entries logged yet
          </p>
          <p className="text-xs max-w-xs mx-auto leading-relaxed pb-6" style={{ color: "var(--text-secondary)" }}>
            Record how you are feeling above to start building your journey log.
          </p>
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="text-center py-12 text-sm" style={{ color: "var(--text-secondary)" }}>
          No entries matched &quot;{searchTerm}&quot;
        </div>
      ) : (
        <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
          {filteredEntries.map((entry) => {
            const mood = MOODS[entry.moodValue];
            const colors = MOOD_COLORS[entry.moodValue];
            const darkColors = MOOD_COLORS_DARK[entry.moodValue];

            return (
              <div
                key={entry.id}
                className="flex items-start justify-between gap-4 p-4 rounded-2xl border transition-all duration-200 hover:shadow-sm dark:hover:shadow-sm"
                style={{
                  backgroundColor: colors.tint,
                  borderColor: `${colors.base}33`, // 20% opacity
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Mood Icon/Emoji */}
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl text-2xl shrink-0 border"
                    style={{
                      backgroundColor: "var(--card)",
                      borderColor: `${colors.base}33`,
                    }}
                  >
                    <span role="img" aria-label={mood?.label || "Mood"}>
                      {mood?.emoji || "❓"}
                    </span>
                  </div>

                  {/* Log Details */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span
                        className="text-sm font-bold"
                        style={{ color: colors.text }}
                      >
                        {mood?.label || "Unknown"}
                      </span>
                      <span style={{ color: "var(--card-border)" }} className="hidden sm:inline">•</span>
                      <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                        {formatDate(entry.date)}
                      </span>
                    </div>

                    {/* Context Tags */}
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-[10px] font-bold border"
                            style={{
                              backgroundColor: "var(--card)",
                              color: "var(--text-secondary)",
                              borderColor: "var(--card-border)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {entry.note ? (
                      <p
                        className="mt-2 text-sm px-3 py-2 rounded-xl inline-block max-w-full break-words font-normal border"
                        style={{
                          backgroundColor: "var(--card)",
                          color: "var(--text-primary)",
                          borderColor: "var(--card-border)",
                          opacity: 0.9,
                        }}
                      >
                        {entry.note}
                      </p>
                    ) : (
                      <p className="mt-2.5 text-xs italic font-medium" style={{ color: "var(--text-secondary)", opacity: 0.7 }}>
                        No reflection note attached
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <button
                  type="button"
                  onClick={() => onDeleteEntry(entry.id)}
                  aria-label={`Delete entry for ${formatDate(entry.date)}`}
                  className="p-2 hover:bg-rose-50 rounded-xl transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:hover:bg-rose-950/30"
                  style={{ color: "var(--text-secondary)" }}
                  title="Delete entry"
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#E8837A"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Dark mode style overrides for history entries */}
      <style jsx>{`
        .dark .space-y-3 > div {
          background-color: var(--background) !important;
        }
      `}</style>
    </div>
  );
}

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
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs border outline-none transition-all duration-200 focus:ring-2 focus:ring-offset-1"
              style={{
                backgroundColor: "var(--background)",
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
          className="text-center rounded-[20px] border border-dashed py-8"
          style={{
            backgroundColor: "var(--background)",
            borderColor: "var(--card-border)",
          }}
        >
          <BreathingCircleIllustration />
          <p className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            No entries logged yet
          </p>
          <p className="text-xs max-w-xs mx-auto leading-relaxed pb-6" style={{ color: "var(--text-secondary)" }}>
            Record how you are feeling above to start building your journey log.
          </p>
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="text-center py-12 text-sm font-bold" style={{ color: "var(--text-secondary)" }}>
          No entries matched &quot;{searchTerm}&quot;
        </div>
      ) : (
        <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-rounded">
          {filteredEntries.map((entry) => {
            const mood = MOODS[entry.moodValue];
            const colors = MOOD_COLORS[entry.moodValue];

            return (
              <div
                key={entry.id}
                className="flex items-start justify-between gap-4 p-6 rounded-[20px] border transition-all duration-200 hover:shadow-md"
                style={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--card-border)",
                  boxShadow: "var(--card-shadow)",
                  borderLeftWidth: "4px",
                  borderLeftColor: colors.base,
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Mood Icon/Emoji - UNIFIED UNIFORM ROUNDED-FULL CONTAINER */}
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full text-2xl shrink-0 border"
                    style={{
                      backgroundColor: "var(--background)",
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
                        className="text-sm font-black uppercase tracking-tight"
                        style={{ color: colors.text }}
                      >
                        {mood?.label || "Unknown"}
                      </span>
                      <span style={{ color: "var(--card-border)" }} className="hidden sm:inline">•</span>
                      <span className="text-xs font-bold" style={{ color: "var(--text-secondary)" }}>
                        {formatDate(entry.date)}
                      </span>
                    </div>

                    {/* Context Tags - UNIFIED STYLE (font-size 13px, padding 6px 14px, rounded-full) */}
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="py-[6px] px-[14px] rounded-full text-[13px] font-black uppercase tracking-tight border inline-flex items-center"
                            style={{
                              backgroundColor: "var(--background)",
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
                        className="mt-3 text-sm px-4 py-3 rounded-[20px] inline-block max-w-full break-words font-semibold border"
                        style={{
                          backgroundColor: "var(--background)",
                          color: "var(--text-primary)",
                          borderColor: "var(--card-border)",
                        }}
                      >
                        {entry.note}
                      </p>
                    ) : (
                      <p className="mt-2.5 text-xs italic font-bold" style={{ color: "var(--text-secondary)", opacity: 0.7 }}>
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
                  className="p-2 rounded-xl transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
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
    </div>
  );
}

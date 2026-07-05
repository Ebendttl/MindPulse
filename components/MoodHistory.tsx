import React, { useState } from "react";
import { MoodEntry } from "@/types";
import { MOODS } from "@/lib/moodData";
import { Trash2, Calendar, Search } from "lucide-react";
import MindfulIllustration from "./MindfulIllustration";

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
    <div className="w-full bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-5 h-5 text-emerald-500" />
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Mood History</h2>
          </div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            An archive of your daily well-being reflections
          </p>
        </div>

        {entries.length > 0 && (
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notes, moods or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs border border-slate-200 bg-slate-50/50 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 dark:placeholder-slate-500 outline-none focus-visible:ring-teal-500"
            />
          </div>
        )}
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-8 bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
          <MindfulIllustration />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 mt-2">
            No entries logged yet
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
            Record how you are feeling above to start building your journey log.
          </p>
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-sm">
          No entries matched &quot;{searchTerm}&quot;
        </div>
      ) : (
        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
          {filteredEntries.map((entry) => {
            const mood = MOODS[entry.moodValue];
            const cardBg = mood 
              ? `${mood.bgLight} dark:${mood.bgDark} border ${mood.borderLight} dark:${mood.borderDark}`
              : "bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80";

            return (
              <div
                key={entry.id}
                className={`flex items-start justify-between gap-4 p-4 rounded-2xl ${cardBg} hover:shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  {/* Mood Icon/Emoji */}
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-xl text-2xl border shadow-sm shrink-0 bg-white dark:bg-slate-950/40 ${
                      mood ? `${mood.borderLight} dark:${mood.borderDark}` : "border-gray-200"
                    }`}
                  >
                    <span role="img" aria-label={mood?.label || "Mood"}>
                      {mood?.emoji || "❓"}
                    </span>
                  </div>

                  {/* Log Details */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className={`text-sm font-bold ${mood ? `${mood.textLight} dark:${mood.textDark}` : "text-slate-800 dark:text-slate-200"}`}>
                        {mood?.label || "Unknown"}
                      </span>
                      <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {formatDate(entry.date)}
                      </span>
                    </div>

                    {/* Context Tags */}
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/60 text-slate-600 border border-slate-200/60 dark:bg-slate-900/40 dark:text-slate-400 dark:border-slate-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {entry.note ? (
                      <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-900/70 px-3 py-2 rounded-xl border border-slate-200/30 dark:border-slate-800/30 inline-block max-w-full break-words shadow-sm font-normal">
                        {entry.note}
                      </p>
                    ) : (
                      <p className="mt-2.5 text-xs italic text-slate-400 dark:text-slate-500 font-medium">
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
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-300 dark:text-slate-600 dark:hover:text-rose-400 dark:hover:bg-rose-950/30 outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                  title="Delete entry"
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

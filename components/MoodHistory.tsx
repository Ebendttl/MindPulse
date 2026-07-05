"use client";

import React, { useState } from "react";
import { MoodEntry } from "@/types";
import { MOODS } from "@/lib/moodData";
import { Trash2, Calendar, FileText, Search } from "lucide-react";

interface MoodHistoryProps {
  entries: MoodEntry[];
  onDeleteEntry: (id: string) => void;
}

export default function MoodHistory({ entries, onDeleteEntry }: MoodHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEntries = entries.filter((entry) => {
    if (!searchTerm) return true;
    return (
      entry.note?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      MOODS[entry.moodValue]?.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.date.includes(searchTerm)
    );
  });

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-5 h-5 text-emerald-500" />
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Mood History</h2>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            A archive of your daily well-being reflections
          </p>
        </div>

        {entries.length > 0 && (
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notes or moods..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs border border-slate-200 bg-slate-50/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 dark:placeholder-slate-500"
            />
          </div>
        )}
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-12 bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
          <FileText className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
            No entries logged yet
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xs mx-auto leading-relaxed">
            Record how you are feeling above to start building your journey log.
          </p>
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="text-center py-12 text-slate-400 dark:text-slate-500 text-sm">
          No entries matched &quot;{searchTerm}&quot;
        </div>
      ) : (
        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
          {filteredEntries.map((entry) => {
            const mood = MOODS[entry.moodValue];
            return (
              <div
                key={entry.id}
                className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-50 dark:bg-slate-900/40 dark:hover:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  {/* Mood Icon/Emoji */}
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-xl text-2xl border shadow-sm shrink-0 bg-white dark:bg-slate-900 ${
                      mood ? "border-slate-100 dark:border-slate-800" : "border-gray-200"
                    }`}
                  >
                    <span role="img" aria-label={mood?.label || "Mood"}>
                      {mood?.emoji || "❓"}
                    </span>
                  </div>

                  {/* Log Details */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {mood?.label || "Unknown"}
                      </span>
                      <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        {formatDate(entry.date)}
                      </span>
                    </div>

                    {entry.note ? (
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-100 dark:border-slate-800 inline-block max-w-full break-words shadow-sm font-normal">
                        {entry.note}
                      </p>
                    ) : (
                      <p className="mt-1 text-xs italic text-slate-400 dark:text-slate-600">
                        No reflection note attached
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <button
                  type="button"
                  onClick={() => onDeleteEntry(entry.id)}
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-300 dark:text-slate-600 dark:hover:text-rose-400 dark:hover:bg-rose-950/30"
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

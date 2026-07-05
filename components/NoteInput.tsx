"use client";

import React from "react";

interface NoteInputProps {
  note: string;
  onChangeNote: (note: string) => void;
  maxChars?: number;
}

export default function NoteInput({ note, onChangeNote, maxChars = 200 }: NoteInputProps) {
  const charsLeft = maxChars - note.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      onChangeNote(value);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <label
          htmlFor="mood-note"
          className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider"
        >
          Add some reflections (Optional)
        </label>
        <span
          className={`text-xs font-mono transition-colors duration-200 ${
            charsLeft <= 20
              ? "text-rose-500 font-bold animate-pulse"
              : charsLeft <= 50
              ? "text-amber-500"
              : "text-slate-400 dark:text-slate-500"
          }`}
        >
          {charsLeft} chars left
        </span>
      </div>
      <textarea
        id="mood-note"
        rows={3}
        maxLength={maxChars}
        value={note}
        onChange={handleChange}
        placeholder="How is your day going? What is on your mind? What made you feel this way?"
        className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white placeholder-slate-400 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 resize-none dark:bg-slate-900/60 dark:border-slate-800 dark:placeholder-slate-500 dark:text-slate-200 dark:focus:ring-indigo-500/20 dark:focus:border-indigo-500"
      />
    </div>
  );
}

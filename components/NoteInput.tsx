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
          className="text-xs font-semibold uppercase"
          style={{ letterSpacing: "0.05em", color: "var(--text-secondary)" }}
        >
          Add some reflections (Optional)
        </label>
        <span
          className={`text-xs font-mono transition-colors duration-200 ${
            charsLeft <= 20
              ? "text-rose-500 font-bold animate-pulse"
              : charsLeft <= 50
              ? "text-amber-500"
              : ""
          }`}
          style={charsLeft > 50 ? { color: "var(--text-secondary)" } : undefined}
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
        className="w-full px-4 py-3 rounded-2xl border transition-all duration-300 resize-none outline-none focus:ring-2 focus:ring-offset-1"
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--card-border)",
          color: "var(--text-primary)",
          // @ts-expect-error CSS custom properties
          "--tw-ring-color": "#6C63FF40",
        }}
      />
    </div>
  );
}

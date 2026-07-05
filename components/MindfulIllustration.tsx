"use client";

import React from "react";

export default function MindfulIllustration() {
  return (
    <div className="relative w-24 h-24 mx-auto flex items-center justify-center mb-3">
      {/* Outer breathing halo */}
      <div className="absolute inset-0 rounded-full bg-teal-500/10 dark:bg-teal-400/5 animate-[pulse_3.5s_ease-in-out_infinite]" />
      
      {/* Mid breathing circle */}
      <div className="absolute w-16 h-16 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 animate-[pulse_2.8s_ease-in-out_infinite]" />
      
      {/* Inner drawing containing a gentle growing plant */}
      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-100 to-teal-50 dark:from-amber-950/40 dark:to-teal-950/40 shadow-sm flex items-center justify-center border border-teal-200/40 dark:border-teal-800/40">
        <svg
          className="w-7 h-7 text-teal-600 dark:text-teal-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          {/* A soft growing plant motif */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 22V10M12 10C12 10 7.5 6.5 7.5 12C7.5 14.5 12 15 12 15M12 10C12 10 16.5 6.5 16.5 12C16.5 14.5 12 15 12 15M12 6.5C12 6.5 9 4.5 9 8M12 6.5C12 6.5 15 4.5 15 8"
          />
        </svg>
      </div>
    </div>
  );
}

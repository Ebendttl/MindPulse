"use client";

import React from "react";

export default function MindfulIllustration() {
  return (
    <div className="relative w-24 h-24 mx-auto flex items-center justify-center mb-4">
      {/* Outer breathing circle */}
      <div className="absolute inset-0 rounded-full bg-indigo-400/10 dark:bg-indigo-500/5 animate-[ping_4s_ease-in-out_infinite] scale-75" />
      
      {/* Mid breathing circle */}
      <div className="absolute w-16 h-16 rounded-full bg-teal-400/20 dark:bg-teal-500/10 animate-[pulse_3s_ease-in-out_infinite]" />
      
      {/* Inner stable calming circle */}
      <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-teal-400 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
        <svg
          className="w-4 h-4 text-white animate-spin-slow"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707"
          />
        </svg>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

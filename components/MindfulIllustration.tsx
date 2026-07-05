"use client";

import React from "react";

/**
 * PulseWaveIllustration — used for "Not enough logs yet" (Mood Trends empty state).
 * A simple line-art wave/pulse shape matching the app's activity-pulse logo motif,
 * animated with slow horizontal wave motion (4s loop, ease-in-out).
 * Size: 72px, with 24px padding built into the container.
 */
export function PulseWaveIllustration() {
  return (
    <div className="flex items-center justify-center py-6">
      <svg
        width="72"
        height="72"
        viewBox="0 0 72 72"
        fill="none"
        className="animate-wave"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="pulseGrad" x1="0" y1="0" x2="72" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6C63FF" />
            <stop offset="100%" stopColor="#4ECDC4" />
          </linearGradient>
        </defs>
        {/* Activity pulse line — mimics the Activity icon motif */}
        <path
          d="M4 36 L16 36 L22 18 L28 52 L34 28 L40 44 L46 24 L52 42 L56 36 L68 36"
          stroke="url(#pulseGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.85"
        />
        {/* Subtle base line */}
        <line
          x1="4" y1="36" x2="68" y2="36"
          stroke="url(#pulseGrad)"
          strokeWidth="1"
          opacity="0.15"
        />
      </svg>
    </div>
  );
}

/**
 * BreathingCircleIllustration — used for "No entries logged yet" (Mood History empty state)
 * and the Insights empty state. A gentle spiral/breathing-circle icon in muted primary color,
 * with a slow scale-pulse animation (3s loop, scale 1 → 1.05 → 1).
 * Size: 64px, with 24px padding built into the container.
 */
export function BreathingCircleIllustration() {
  return (
    <div className="flex items-center justify-center py-6">
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        className="animate-scale-pulse"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="breatheGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6C63FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {/* Outer breathing circle */}
        <circle
          cx="32" cy="32" r="28"
          stroke="url(#breatheGrad)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.3"
        />
        {/* Middle circle */}
        <circle
          cx="32" cy="32" r="20"
          stroke="url(#breatheGrad)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />
        {/* Inner circle */}
        <circle
          cx="32" cy="32" r="12"
          stroke="url(#breatheGrad)"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        {/* Gentle spiral arm */}
        <path
          d="M32 32 C32 24, 40 20, 44 28 C48 36, 40 42, 32 38 C24 34, 28 26, 36 28"
          stroke="url(#breatheGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        {/* Center dot */}
        <circle cx="32" cy="32" r="3" fill="url(#breatheGrad)" opacity="0.4" />
      </svg>
    </div>
  );
}

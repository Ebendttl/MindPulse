"use client";

import React, { useState, useEffect } from "react";
import { Wind, Play, Pause, Sparkles, RefreshCw } from "lucide-react";

const WELLNESS_QUOTES = [
  {
    text: "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.",
    author: "Thich Nhat Hanh",
  },
  {
    text: "Within you, there is a stillness and a sanctuary to which you can retreat at any time.",
    author: "Hermann Hesse",
  },
  {
    text: "Almost everything will work again if you unplug it for a few minutes, including you.",
    author: "Anne Lamott",
  },
  {
    text: "You don't have to control your thoughts. You just have to stop letting them control you.",
    author: "Dan Millman",
  },
  {
    text: "Deep breathing is our body's love language to itself.",
    author: "Unknown",
  },
  {
    text: "Breathe in deeply to bring your mind home to your body.",
    author: "Thich Nhat Hanh",
  },
  {
    text: "Quiet the mind and the soul will speak.",
    author: "Ma Jaya Sati Bhagavati",
  },
  {
    text: "Present moment, beautiful moment.",
    author: "Thich Nhat Hanh",
  },
];

type BreathPhase = "Inhale" | "Hold (Full)" | "Exhale" | "Hold (Empty)";

export default function BreathingSpace() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<BreathPhase>("Inhale");
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Rotate quotes
  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % WELLNESS_QUOTES.length);
  };

  useEffect(() => {
    // Generate a random quote on mount
    setQuoteIndex(Math.floor(Math.random() * WELLNESS_QUOTES.length));
  }, []);

  // Handle breathing timer
  useEffect(() => {
    if (!isPlaying) {
      setPhase("Inhale");
      setSecondsLeft(4);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Transition phase
          setPhase((currentPhase) => {
            switch (currentPhase) {
              case "Inhale":
                return "Hold (Full)";
              case "Hold (Full)":
                return "Exhale";
              case "Exhale":
                return "Hold (Empty)";
              case "Hold (Empty)":
                return "Inhale";
              default:
                return "Inhale";
            }
          });
          return 4; // Reset to 4 seconds
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  // Determine scaling classes based on breathing phase
  const getScaleClass = () => {
    if (!isPlaying) return "scale-75 opacity-60";
    switch (phase) {
      case "Inhale":
        return "scale-110 duration-[4000ms] ease-out";
      case "Hold (Full)":
        return "scale-110 duration-1000";
      case "Exhale":
        return "scale-75 duration-[4000ms] ease-in";
      case "Hold (Empty)":
        return "scale-75 duration-1000";
      default:
        return "scale-75";
    }
  };

  // Determine circle color depending on phase
  const getCircleColor = () => {
    if (!isPlaying) return "rgba(108, 99, 255, 0.2)";
    switch (phase) {
      case "Inhale":
      case "Hold (Full)":
        return "rgba(78, 205, 196, 0.4)"; // Soft Teal
      case "Exhale":
      case "Hold (Empty)":
        return "rgba(108, 99, 255, 0.4)"; // Warm Indigo
      default:
        return "rgba(108, 99, 255, 0.2)";
    }
  };

  return (
    <div
      className="rounded-[20px] p-6 transition-all duration-300 w-full border flex flex-col gap-6"
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wind className="w-5 h-5 text-teal-400" />
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
            Breathe & Center
          </h2>
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300"
          style={{
            backgroundColor: isPlaying ? "rgba(232, 131, 122, 0.15)" : "rgba(78, 205, 196, 0.15)",
            color: isPlaying ? "#E8837A" : "#4ECDC4",
            border: `1px solid ${isPlaying ? "#E8837A33" : "#4ECDC433"}`,
          }}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive breathing widget */}
      <div className="flex flex-col items-center justify-center py-4 bg-black/10 dark:bg-black/20 rounded-2xl border" style={{ borderColor: "var(--card-border)" }}>
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Pulsing ring outer container */}
          <div
            className={`absolute w-full h-full rounded-full transition-all ease-linear ${getScaleClass()}`}
            style={{
              backgroundColor: getCircleColor(),
              boxShadow: isPlaying ? "0 0 20px rgba(78, 205, 196, 0.3)" : "none",
              transitionProperty: "transform, background-color, box-shadow",
            }}
          />
          {/* Inner core */}
          <div
            className="w-16 h-16 rounded-full bg-slate-900/60 flex flex-col items-center justify-center z-10 border border-white/10"
          >
            {isPlaying ? (
              <span className="text-lg font-black text-white">{secondsLeft}</span>
            ) : (
              <Wind className="w-6 h-6 text-white/70" />
            )}
          </div>
        </div>

        {/* Breathing Phase Label */}
        <div className="mt-4 text-center">
          <p className="text-sm font-black uppercase tracking-wider min-h-[20px]" style={{ color: isPlaying ? "#4ECDC4" : "var(--text-secondary)" }}>
            {isPlaying ? phase : "Ready when you are"}
          </p>
          <p className="text-[11px] font-bold mt-1" style={{ color: "var(--text-secondary)" }}>
            {isPlaying ? "Follow the expanding circle" : "Take a deep, slow breath"}
          </p>
        </div>
      </div>

      {/* Quote / Reflection area */}
      <div
        className="rounded-[15px] p-4 flex gap-3 items-start border text-xs"
        style={{
          backgroundColor: "var(--background)",
          borderColor: "var(--card-border)",
        }}
      >
        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(108, 99, 255, 0.1)", color: "#6C63FF" }}>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <div className="flex-1">
          <p className="font-semibold leading-relaxed" style={{ color: "var(--text-primary)" }}>
            &ldquo;{WELLNESS_QUOTES[quoteIndex].text}&rdquo;
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="font-black tracking-wide uppercase opacity-75" style={{ color: "#6C63FF", fontSize: "10px" }}>
              — {WELLNESS_QUOTES[quoteIndex].author}
            </span>
            <button
              onClick={handleNextQuote}
              className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all duration-200"
              style={{ color: "var(--text-secondary)" }}
              title="Next Inspiration"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

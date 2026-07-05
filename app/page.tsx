"use client";

import React, { useState, useEffect } from "react";
import { MoodEntry, MoodValue } from "@/types";
import { getMoodEntries, saveMoodEntry, deleteMoodEntry } from "@/lib/storage";

import MoodPicker from "@/components/MoodPicker";
import NoteInput from "@/components/NoteInput";
import TagSelector from "@/components/TagSelector";
import TrendChart from "@/components/TrendChart";
import MoodHistory from "@/components/MoodHistory";
import StatsSummary from "@/components/StatsSummary";
import InsightsCard from "@/components/InsightsCard";
import BreathingSpace from "@/components/BreathingSpace";
import Link from "next/link";
import { Heart, Sun, Moon, Info, RefreshCw, Calendar, CheckCircle2, Sparkles } from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMood, setSelectedMood] = useState<MoodValue | null>(null);
  const [note, setNote] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Custom notifications state
  const [notification, setNotification] = useState<{ message: string; type: "success" | "info" } | null>(null);
  // Dark/Light Theme state
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Get current date string in YYYY-MM-DD
  const getTodayDateString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Mount effect to load entries and theme
  useEffect(() => {
    setEntries(getMoodEntries());
    setSelectedDate(getTodayDateString());

    // Sync theme with localStorage or system preference
    const savedTheme = localStorage.getItem("mindpulse_theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (systemPrefersDark) {
      setTheme("dark");
      document.documentElement.classList.toggle("dark", true);
    }

    // Delay mounting slightly to allow user to experience the beautiful intro sequence
    const timer = setTimeout(() => {
      setMounted(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Update form inputs when selectedDate or entries list changes
  useEffect(() => {
    if (!selectedDate) return;

    const existingEntry = entries.find((e) => e.date === selectedDate);
    if (existingEntry) {
      setSelectedMood(existingEntry.moodValue);
      setNote(existingEntry.note || "");
      setSelectedTags(existingEntry.tags || []);
    } else {
      setSelectedMood(null);
      setNote("");
      setSelectedTags([]);
    }
  }, [selectedDate, entries]);

  // Toggle Theme helper
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("mindpulse_theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  // Show auto-dismiss notification helper
  const showNotification = (message: string, type: "success" | "info" = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Log mood submit handler
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) {
      showNotification("Please select an emoji mood before saving.", "info");
      return;
    }

    saveMoodEntry({
      date: selectedDate,
      moodValue: selectedMood,
      note: note.trim(),
      tags: selectedTags,
    });

    // Refresh state
    setEntries(getMoodEntries());

    showNotification("Reflection saved ✓");
  };

  // Delete entry handler
  const handleDelete = (id: string) => {
    const updatedList = deleteMoodEntry(id);
    setEntries(updatedList);
    showNotification("Mood reflection removed.", "info");
  };

  // Pre-populate dummy history for demonstration
  const handlePopulateDemoData = () => {
    const sampleNotes = [
      "Had a wonderful morning walk in the park. Connecting with nature helped.",
      "A bit stressed with tasks, but managed to take a short meditation break.",
      "Had a lovely lunch with friends. Felt connected and supported.",
      "Felt tired and struggled to focus in the afternoon. Rested early.",
      "Extremely productive focus day. Coding is going smoothly!",
      "A calm and restful Sunday. Spent time reading a good book.",
      "Felt anxious in the morning, but doing some breathing exercises helped ground me.",
      "Logged off early. Spent time playing music, which raised my spirits.",
      "Had an okay day. Nothing special, just stable and calm.",
      "Struggled to get out of bed, but felt slightly better after some tea.",
      "Felt incredibly radiant today. Caught up with an old classmate.",
      "Quite peaceful. Practiced self-care and cooked a healthy dinner.",
      "Tired and a bit overwhelmed by chores, but pushed through.",
      "Great start to the week! Feeling energized and optimistic.",
    ];

    const sampleMoods: MoodValue[] = [5, 4, 6, 2, 5, 4, 3, 5, 3, 2, 6, 4, 2, 5];

    // Generate logs for the last 14 days
    const demoEntries: MoodEntry[] = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;

      const sampleTags = [
        ["Exercise", "Social"], // mood 5
        ["Sleep"],             // mood 4
        ["Social"],            // mood 6
        ["Work", "Sleep"],     // mood 2
        ["Exercise"],          // mood 5
        ["Social", "Weather"], // mood 4
        ["Work"],              // mood 3
        ["Exercise", "Social"], // mood 5
        ["Sleep"],             // mood 3
        ["Work"],              // mood 2
        ["Exercise", "Social"], // mood 6
        ["Weather"],           // mood 4
        ["Work"],              // mood 2
        ["Exercise"],          // mood 5
      ];

      demoEntries.push({
        id: `demo-${i}`,
        date: dateStr,
        timestamp: d.getTime() - i * 3600000,
        moodValue: sampleMoods[i % sampleMoods.length],
        note: sampleNotes[i % sampleNotes.length],
        tags: sampleTags[i % sampleTags.length],
      });
    }

    // Save demo entries to storage
    localStorage.setItem("mindpulse_mood_entries", JSON.stringify(demoEntries));
    setEntries(demoEntries);
    showNotification("Generated 14 days of demo logs successfully!", "success");
  };

  // Clear all data helper
  const handleClearAllData = () => {
    if (confirm("Are you sure you want to clear your entire tracking history? This cannot be undone.")) {
      localStorage.removeItem("mindpulse_mood_entries");
      setEntries([]);
      setSelectedMood(null);
      setNote("");
      showNotification("All tracked data has been reset.", "info");
    }
  };

  // Quick log helper for empty state nudges
  const handleQuickLog = (dateStr: string) => {
    setSelectedDate(dateStr);
    showNotification(`Date set to ${dateStr}. Ready to log reflection!`, "info");
    setTimeout(() => {
      const formElement = document.getElementById("reflection-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 150);
  };

  // If component is not mounted, render a calming full-page loading placeholder
  if (!mounted) {
    return (
      <div 
        className="flex-1 flex flex-col items-center justify-center min-h-screen relative overflow-hidden" 
        style={{ backgroundColor: "var(--background)" }}
      >
        {/* Glow ambient effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-tr from-[#6C63FF]/15 to-[#4ECDC4]/15 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-gradient-to-br from-[#4ECDC4]/10 to-[#6C63FF]/10 rounded-full blur-[50px]" />

        <div className="relative flex flex-col items-center z-10 text-center px-4">
          {/* Glowing Ring Outer Loader */}
          <div className="relative w-28 h-28 flex items-center justify-center mb-6">
            {/* Pulsing outer ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#6C63FF]/30 animate-spin" style={{ animationDuration: "12s" }} />
            {/* Pulse wave ring */}
            <div className="absolute inset-2 rounded-full border border-teal-400/40 animate-ping" style={{ animationDuration: "3s" }} />
            {/* Core logo background */}
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center border shadow-xl transition-all duration-300"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--card-border)",
                boxShadow: "0 10px 25px -5px rgba(108, 99, 255, 0.15), 0 8px 10px -6px rgba(108, 99, 255, 0.1)",
              }}
            >
              {/* Logo image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="MindPulse Logo"
                className="w-12 h-12 object-contain animate-pulse"
              />
            </div>
          </div>

          {/* App Brand Name */}
          <h1 
            className="text-2xl font-black tracking-tight mb-2 uppercase"
            style={{ color: "var(--text-primary)" }}
          >
            Mind<span style={{ color: "#6C63FF" }}>Pulse</span>
          </h1>

          {/* Calming text */}
          <p className="text-xs font-black uppercase tracking-widest text-[#4ECDC4] mb-5 animate-pulse">
            Nurturing your mind
          </p>

          {/* Subtle loading progress bar */}
          <div 
            className="w-48 h-[3px] rounded-full overflow-hidden border relative"
            style={{
              backgroundColor: "rgba(0,0,0,0.05)",
              borderColor: "var(--card-border)"
            }}
          >
            <div 
              className="h-full rounded-full bg-gradient-to-r from-[#6C63FF] to-[#4ECDC4] animate-loading-bar"
              style={{
                width: "60%",
                position: "absolute",
                left: 0,
                top: 0,
              }}
            />
          </div>

          {/* Subtitle / Tip */}
          <p className="text-[11px] font-bold mt-5 max-w-[200px]" style={{ color: "var(--text-secondary)" }}>
            Take a slow, deep breath to center yourself...
          </p>
        </div>
      </div>
    );
  }

  // Check if today is already logged
  const isTodayLogged = entries.some((e) => e.date === getTodayDateString());
  const selectedDateIsToday = selectedDate === getTodayDateString();
  const currentSelectedEntry = entries.find((e) => e.date === selectedDate);

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Dynamic Notification Banner */}
      {notification && (
        <div
          className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-xl transition-all duration-300 border animate-slide-in"
          style={{
            backgroundColor: "var(--card)",
            borderColor: notification.type === "success" ? "rgba(143, 201, 126, 0.4)" : "rgba(108, 99, 255, 0.25)",
            color: "var(--text-primary)",
          }}
        >
          <CheckCircle2
            className="w-5 h-5"
            style={{ color: notification.type === "success" ? "#8FC97E" : "#6C63FF" }}
          />
          <span className="text-xs font-bold tracking-wide">{notification.message}</span>
        </div>
      )}

      {/* Sticky Header Nav */}
      <header
        className="sticky top-0 z-40 w-full py-5 backdrop-blur-md transition-all duration-300"
        style={{
          borderBottom: "1px solid var(--card-border)",
          backgroundColor: "var(--header-bg)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div
                className="w-10 h-10 rounded-2xl overflow-hidden flex items-center justify-center text-white shadow-md border"
                style={{
                  borderColor: "var(--card-border)",
                  boxShadow: "0 4px 12px rgba(108, 99, 255, 0.15)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="MindPulse Logo"
                  className="w-full h-full object-cover animate-pulse"
                />
              </div>
              <h1
                id="main-title"
                className="text-2xl font-black tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                Mind<span style={{ color: "#6C63FF" }}>Pulse</span>
              </h1>
            </div>
            {/* SDG badge — UNIFIED PILL STYLE (font-size 13px, padding 6px 14px, rounded-full) */}
            <div className="mt-2.5">
              <span
                className="inline-flex items-center gap-1.5 py-[6px] px-[14px] rounded-full text-[13px] font-black uppercase tracking-tight border"
                style={{
                  backgroundColor: "var(--sdg-bg)",
                  borderColor: "var(--sdg-border)",
                  color: "var(--sdg-text)",
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                UN SDG 3: Good Health & Well-being
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button — icon button, subtle hover */}
            <button
              id="theme-toggle"
              type="button"
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border transition-all duration-300"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--card-border)",
                color: "var(--text-secondary)",
              }}
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--background)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--card)"; }}
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            
            {/* Demo Generator Button — ghost/outline style */}
            <button
              id="demo-data-btn"
              type="button"
              onClick={handlePopulateDemoData}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300"
              style={{
                backgroundColor: "transparent",
                border: "1.5px solid var(--text-secondary)",
                color: "var(--text-secondary)",
              }}
              title="Populate 14-day history for testing"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#6C63FF";
                (e.currentTarget as HTMLElement).style.color = "#6C63FF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--text-secondary)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demo Logs</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Dashboard stats summary indicator (spans full width above grid columns) */}
        <StatsSummary entries={entries} />

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Record Reflection Form */}
          <section
            id="reflection-form"
            className="rounded-[20px] p-6 flex flex-col justify-between border h-full transition-all duration-300"
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
            <form onSubmit={handleSave} className="flex flex-col h-full flex-grow justify-between">
              <div className="space-y-6 flex-grow flex flex-col justify-start">
                
                {/* Heading and Date picker */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                      {currentSelectedEntry ? "Edit Reflection" : "Record Reflection"}
                    </h2>
                    <p className="text-xs mt-0.5 font-semibold" style={{ color: "var(--text-secondary)" }}>
                      Save a moment to map your mental landscape
                    </p>
                  </div>

                  {/* Date Input */}
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl border w-full sm:w-auto"
                    style={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--card-border)",
                    }}
                  >
                    <Calendar className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--text-secondary)" }} />
                    <input
                      id="log-date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      max={getTodayDateString()}
                      className="bg-transparent border-none text-xs font-semibold focus:outline-none w-full cursor-pointer"
                      style={{ color: "var(--text-primary)" }}
                    />
                  </div>
                </div>

                {/* Onboarding Help Box */}
                {entries.length === 0 && (
                  <div
                    className="rounded-[20px] p-6 flex items-start gap-4 border"
                    style={{
                      backgroundColor: "var(--sdg-bg)",
                      borderColor: "var(--sdg-border)",
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm border"
                      style={{
                        backgroundColor: "var(--background)",
                        color: "var(--sdg-text)",
                        borderColor: "var(--sdg-border)",
                      }}
                    >
                      {selectedMood === null ? "1" : "2"}
                    </div>
                    <div>
                      <h4
                        className="text-xs font-black uppercase tracking-wider"
                        style={{
                          color: "var(--sdg-text)",
                        }}
                      >
                        {selectedMood === null ? "Welcome to MindPulse" : "Almost there"}
                      </h4>
                      <p
                        className="text-xs font-bold mt-0.5 leading-relaxed"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {selectedMood === null
                          ? "Start here — log how you're feeling today by choosing one of the emojis below."
                          : "Great! Next, select any context tags, add an optional reflection note, and click 'Log Reflection'."}
                      </p>
                    </div>
                  </div>
                )}

                {/* Mood Picker Option Component */}
                <MoodPicker selectedMood={selectedMood} onSelectMood={setSelectedMood} />

                {/* Context Tags Selector component */}
                <TagSelector selectedTags={selectedTags} onChangeTags={setSelectedTags} />

                {/* Optional Note Text Area Component */}
                <NoteInput note={note} onChangeNote={setNote} />

              </div>

              {/* Submit Action Button */}
              <div className="flex justify-between items-center pt-6 mt-auto">
                <div className="text-[10px] max-w-[200px] sm:max-w-xs leading-normal" style={{ color: "var(--text-secondary)" }}>
                  {!isTodayLogged && selectedDateIsToday && (
                    <span className="flex items-center gap-1 font-semibold">
                      <Info className="w-3 h-3 shrink-0" style={{ color: "#4ECDC4" }} />
                      {"Whenever you're ready, take a gentle pause here."}
                    </span>
                  )}
                </div>

                <button
                  id="save-log-btn"
                  type="submit"
                  className="flex items-center gap-1.5 px-6 py-3 rounded-2xl text-white font-bold text-sm active:scale-[0.98] transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #6C63FF, #5A52E0)",
                    boxShadow: "0 4px 16px rgba(108, 99, 255, 0.25)",
                  }}
                >
                  <span>{currentSelectedEntry ? "Update Entry" : "Log Reflection"}</span>
                </button>
              </div>
            </form>
          </section>

          {/* Card 2: Trend Chart Component */}
          <TrendChart entries={entries} />

          {/* Card 3: Insights Card */}
          <InsightsCard entries={entries} />

          {/* Card 4: Mood History list component */}
          <MoodHistory entries={entries} onDeleteEntry={handleDelete} onQuickLog={handleQuickLog} />

          {/* Card 5: Interactive Breathing & Mindfulness Space (Spans both columns on desktop) */}
          <div className="lg:col-span-2">
            <BreathingSpace />
          </div>
          
        </div>

        {/* Reset All Data utility button */}
        {entries.length > 0 && (
          <div className="flex justify-end mt-6">
            <button
              id="clear-all-btn"
              type="button"
              onClick={handleClearAllData}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all duration-300"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#E8837A"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset All Local Storage Data</span>
            </button>
          </div>
        )}
      </main>

      {/* Rebuilt Structured Footer Bar */}
      <footer
        className="w-full py-8"
        style={{
          borderTop: "1px solid var(--card-border)",
          backgroundColor: "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-center md:text-left">
            {/* Left Column */}
            <div className="text-[13px] font-bold" style={{ color: "var(--text-secondary)" }}>
              MindPulse © 2026 · Built with mindfulness
            </div>

            {/* Center Column - Calm Pill/Badge */}
            <div className="flex justify-center">
              <Link
                href="/crisis"
                className="inline-flex items-center gap-2 py-[6px] px-[14px] rounded-full text-[13px] font-black uppercase tracking-tight border transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: "var(--crisis-bg)",
                  color: "var(--crisis-text)",
                  borderColor: "var(--crisis-border)",
                }}
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Crisis support resources</span>
              </Link>
            </div>

            {/* Right Column - SDG Badge Pill */}
            <div className="flex justify-center md:justify-end">
              <div
                className="inline-flex items-center gap-1.5 py-[6px] px-[14px] rounded-full text-[13px] font-black uppercase tracking-tight border"
                style={{
                  backgroundColor: "var(--sdg-bg)",
                  borderColor: "var(--sdg-border)",
                  color: "var(--sdg-text)",
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>UN SDG Goal 3: Good Health</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

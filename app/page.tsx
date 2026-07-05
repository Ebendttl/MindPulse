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
import Link from "next/link";
import { Heart, Activity, Sun, Moon, Info, Sparkles, RefreshCw, Calendar, CheckCircle2 } from "lucide-react";

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
    setMounted(true);
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

  // If component is not mounted, render a calming full-page loading placeholder
  if (!mounted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-950/40 flex items-center justify-center">
            <Heart className="w-8 h-8 text-indigo-500 fill-indigo-200 dark:fill-none" />
          </div>
          <span className="text-lg font-semibold text-slate-500 dark:text-slate-400">
            Nurturing your mind...
          </span>
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
          className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-xl transition-all duration-300 border animate-slide-in ${
            notification.type === "success"
              ? "bg-emerald-50 border-emerald-100 text-emerald-800 dark:bg-slate-900 dark:border-emerald-900/50 dark:text-emerald-300"
              : "bg-indigo-50 border-indigo-100 text-indigo-800 dark:bg-slate-900 dark:border-indigo-900/50 dark:text-indigo-300"
          }`}
        >
          <CheckCircle2 className={`w-5 h-5 ${notification.type === "success" ? "text-emerald-500" : "text-indigo-500"}`} />
          <span className="text-xs font-semibold tracking-wide">{notification.message}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Calming Top Header bar */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-slate-100 dark:border-slate-900 pb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <h1 id="main-title" className="text-2xl font-black tracking-tight text-slate-800 dark:text-slate-50">
                Mind<span className="text-indigo-500">Pulse</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-medium">
              Your mindful compass. Supporting{" "}
              <span className="text-emerald-500 dark:text-emerald-400 font-semibold">
                UN SDG 3: Good Health & Well-being
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle"
              type="button"
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800/80 text-slate-500 dark:text-slate-400 transition-all duration-300"
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            
            {/* Demo Generator Button */}
            <button
              id="demo-data-btn"
              type="button"
              onClick={handlePopulateDemoData}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-300 dark:hover:bg-emerald-950/40 transition-all duration-300"
              title="Populate 14-day history for testing"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demo Logs</span>
            </button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Logging & Stats */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Logging reflection Card */}
            <section className="bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm">
              <form onSubmit={handleSave} className="space-y-6">
                
                {/* Heading and Date picker */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                      {currentSelectedEntry ? "Edit Reflection" : "Record Reflection"}
                    </h2>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      Save a moment to map your mental landscape
                    </p>
                  </div>

                  {/* Date Input */}
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800 w-full sm:w-auto">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <input
                      id="log-date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      max={getTodayDateString()}
                      className="bg-transparent border-none text-xs font-semibold text-slate-600 focus:outline-none dark:text-slate-300 w-full cursor-pointer"
                    />
                  </div>
                </div>

                {/* Onboarding Help Box */}
                {entries.length === 0 && (
                  <div className="bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-150/40 dark:border-indigo-900/40 rounded-2xl p-4 flex items-start gap-3 animate-[pulse_3s_infinite] shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 text-indigo-500 font-bold text-sm">
                      {selectedMood === null ? "1" : "2"}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider">
                        {selectedMood === null ? "Welcome to MindPulse" : "Almost there"}
                      </h4>
                      <p className="text-xs text-indigo-950 dark:text-slate-350 font-semibold mt-0.5 leading-relaxed">
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

                {/* Submit Action Button */}
                <div className="flex justify-between items-center pt-2">
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 max-w-[200px] sm:max-w-xs leading-normal">
                    {!isTodayLogged && selectedDateIsToday && (
                      <span className="flex items-center gap-1">
                        <Info className="w-3 h-3 text-indigo-400 shrink-0" />
                        {"Log today's mood to keep your logging streak alive!"}
                      </span>
                    )}
                  </div>

                  <button
                    id="save-log-btn"
                    type="submit"
                    className="flex items-center gap-1.5 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all duration-300 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                  >
                    <span>{currentSelectedEntry ? "Update Entry" : "Log Reflection"}</span>
                  </button>
                </div>
              </form>
            </section>

            {/* Dashboard stats summary indicator */}
            <StatsSummary entries={entries} />

            {/* Insights Card */}
            <InsightsCard entries={entries} />
          </div>

          {/* Right Column: Trend & Archives */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Trend Chart Component */}
            <TrendChart entries={entries} />

            {/* Mood History list component */}
            <MoodHistory entries={entries} onDeleteEntry={handleDelete} />

            {/* Clear All Data utility button */}
            {entries.length > 0 && (
              <div className="flex justify-end pt-2">
                <button
                  id="clear-all-btn"
                  type="button"
                  onClick={handleClearAllData}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold text-slate-400 hover:text-rose-500 transition-all duration-300"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset All Local Storage Data</span>
                </button>
              </div>
            )}
          </div>
          
        </div>
      </main>

      {/* Calming bottom footer */}
      <footer className="mt-auto py-8 border-t border-slate-100 dark:border-slate-900 bg-white/30 dark:bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                MindPulse © 2026. Built with mindfulness.
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-550 dark:text-slate-450">
              <span>Aligned with</span>
              <span className="text-emerald-650 dark:text-emerald-400">UN SDG Goal 3: Good Health & Well-being</span>
            </div>
          </div>
          <div className="w-full flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-900 gap-3">
            <Link
              href="/crisis"
              className="text-[11.5px] font-bold text-rose-500 hover:text-rose-600 dark:text-rose-450 dark:hover:text-rose-400 flex items-center gap-1 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-rose-500 rounded px-1.5 py-0.5 outline-none"
            >
              <span>Need to talk to someone? Crisis support resources →</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

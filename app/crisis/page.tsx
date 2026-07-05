"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Phone, MessageSquare, Heart, ShieldAlert, Sparkles } from "lucide-react";

export default function CrisisPage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <title>Crisis Support Resources | MindPulse</title>
      <meta name="description" content="Free, confidential crisis support resources. Aligned with UN SDG 3." />
      <main className="flex-grow max-w-3xl w-full mx-auto px-4 py-16 sm:px-6">
        
        {/* Back navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold transition-all duration-300 mb-8 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg px-2.5 py-1.5 border"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--card-border)",
            color: "var(--text-secondary)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "var(--card-border-hover)";
            el.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "var(--card-border)";
            el.style.color = "var(--text-secondary)";
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to MindPulse Dashboard</span>
        </Link>

        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto sm:mx-0 border"
            style={{
              backgroundColor: "var(--crisis-bg)",
              borderColor: "var(--crisis-border)",
              color: "var(--crisis-text)",
            }}
          >
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h1 className="text-3xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
            Support Resources
          </h1>
          <p className="text-sm mt-2 max-w-xl leading-relaxed font-semibold" style={{ color: "var(--text-secondary)" }}>
            If you or someone you know is going through a difficult time, please know that you do not have to carry it alone. Warm, supportive, and confidential help is always available.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="space-y-6">
          
          {/* Resource 1: 988 */}
          <div
            className="rounded-[20px] p-6 flex flex-col sm:flex-row gap-5 items-start border transition-all duration-300"
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
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border"
              style={{
                backgroundColor: "rgba(108, 99, 255, 0.08)",
                borderColor: "rgba(108, 99, 255, 0.15)",
                color: "#6C63FF",
              }}
            >
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
                988 Suicide & Crisis Lifeline
              </h2>
              <p className="text-xs mt-0.5 font-bold" style={{ color: "var(--text-secondary)" }}>
                Available 24 hours a day, 7 days a week
              </p>
              <p className="text-sm mt-3 leading-relaxed font-semibold" style={{ color: "var(--text-primary)" }}>
                A free, confidential resource for anyone in suicidal crisis or emotional distress. You can call or text <strong style={{ color: "#6C63FF" }}>988</strong> to connect with a trained counselor.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="tel:988"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#6C63FF] hover:bg-[#5A52E0] text-white transition-all duration-300 shadow-md shadow-indigo-600/10 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 outline-none"
                >
                  Call 988
                </a>
                <a
                  href="sms:988"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 outline-none"
                  style={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--card-border)",
                    color: "var(--text-primary)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--card-border-hover)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--card-border)";
                  }}
                >
                  Text 988
                </a>
              </div>
            </div>
          </div>

          {/* Resource 2: Crisis Text Line */}
          <div
            className="rounded-[20px] p-6 flex flex-col sm:flex-row gap-5 items-start border transition-all duration-300"
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
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border"
              style={{
                backgroundColor: "rgba(78, 205, 196, 0.08)",
                borderColor: "rgba(78, 205, 196, 0.15)",
                color: "#4ECDC4",
              }}
            >
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
                Crisis Text Line
              </h2>
              <p className="text-xs mt-0.5 font-bold" style={{ color: "var(--text-secondary)" }}>
                Support via SMS text message, 24/7
              </p>
              <p className="text-sm mt-3 leading-relaxed font-semibold" style={{ color: "var(--text-primary)" }}>
                Connect with a crisis counselor by text. Free, confidential support for any crisis, from anxiety and depression to relationships and stress.
              </p>
              <div className="mt-4">
                <a
                  href="sms:741741?&body=HOME"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#4ECDC4] hover:bg-[#3db8af] text-white transition-all duration-300 shadow-md shadow-emerald-600/10 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 outline-none"
                >
                  Text HOME to 741741
                </a>
              </div>
            </div>
          </div>

          {/* Calming Disclaimer */}
          <div
            className="rounded-[20px] p-6 flex gap-4 items-start mt-8 border"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--card-border)",
            }}
          >
            <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--text-secondary)" }} />
            <p className="text-xs leading-relaxed font-semibold" style={{ color: "var(--text-secondary)" }}>
              MindPulse is a daily logging utility designed to support self-awareness and wellness tracking under UN Sustainable Development Goal 3. It is not a clinical tool or diagnostic service. If you are experiencing a medical emergency, please contact local emergency services immediately.
            </p>
          </div>

        </div>

      </main>

      {/* Footer - Unified structure */}
      <footer
        className="w-full mt-auto py-8"
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

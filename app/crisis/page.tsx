import React from "react";
import Link from "next/link";
import { ArrowLeft, Phone, MessageSquare, Heart, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Crisis Support Resources | MindPulse",
  description: "Free, confidential crisis support resources. Aligned with UN SDG 3.",
};

export default function CrisisPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col">
      <main className="flex-grow max-w-3xl w-full mx-auto px-4 py-16 sm:px-6">
        
        {/* Back navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all duration-300 mb-8 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg px-2 py-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to MindPulse Dashboard</span>
        </Link>

        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-500 mb-4 mx-auto sm:mx-0">
            <Heart className="w-6 h-6 fill-rose-100 dark:fill-none" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-slate-50">
            Support Resources
          </h1>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-2 max-w-xl leading-relaxed">
            If you or someone you know is going through a difficult time, please know that you do not have to carry it alone. Warm, supportive, and confidential help is always available.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="space-y-6">
          
          {/* Resource 1: 988 */}
          <div className="bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center shrink-0 text-indigo-500">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                988 Suicide & Crisis Lifeline
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                Available 24 hours a day, 7 days a week
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                A free, confidential resource for anyone in suicidal crisis or emotional distress. You can call or text <strong className="text-indigo-600 dark:text-indigo-400">988</strong> to connect with a trained counselor.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="tel:988"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-300 shadow-md shadow-indigo-600/10 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 outline-none"
                >
                  Call 988
                </a>
                <a
                  href="sms:988"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-slate-500 outline-none"
                >
                  Text 988
                </a>
              </div>
            </div>
          </div>

          {/* Resource 2: Crisis Text Line */}
          <div className="bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center shrink-0 text-emerald-500">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Crisis Text Line
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                Support via SMS text message, 24/7
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                Connect with a crisis counselor by text. Free, confidential support for any crisis, from anxiety and depression to relationships and stress.
              </p>
              <div className="mt-4">
                <a
                  href="sms:741741?&body=HOME"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-300 shadow-md shadow-emerald-600/10 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 outline-none"
                >
                  Text HOME to 741741
                </a>
              </div>
            </div>
          </div>

          {/* Calming Disclaimer */}
          <div className="bg-slate-100/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800/60 rounded-3xl p-6 flex gap-4 items-start mt-8">
            <ShieldAlert className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              MindPulse is a daily logging utility designed to support self-awareness and wellness tracking under UN Sustainable Development Goal 3. It is not a clinical tool or diagnostic service. If you are experiencing a medical emergency, please contact local emergency services immediately.
            </p>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-100 dark:border-slate-900 bg-white/30 dark:bg-slate-950/20 text-center">
        <span className="text-[11px] font-medium text-slate-400 dark:text-slate-600">
          MindPulse © 2026. Built with mindfulness.
        </span>
      </footer>
    </div>
  );
}

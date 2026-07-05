import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MindPulse | Daily Mood Tracker & Mental Well-being",
  description:
    "Track your daily mood, jot down quick reflections, and visualize your emotional trends over time. Supporting UN SDG 3 (Good Health and Well-being).",
  keywords: [
    "MindPulse",
    "Mood Tracker",
    "Mental Health",
    "Well-being",
    "SDG 3",
    "Self-care",
    "Mental Wellness",
  ],
  authors: [{ name: "MindPulse Team" }],
  openGraph: {
    title: "MindPulse | Daily Mood Tracker",
    description:
      "A calming daily mood-tracking dashboard designed to support mental wellness and UN SDG 3.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground min-h-full flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}

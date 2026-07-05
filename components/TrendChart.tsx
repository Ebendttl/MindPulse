import React, { useState, useMemo } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";
import { MoodEntry, MoodValue } from "@/types";
import { MOODS } from "@/lib/moodData";
import { BarChart2, TrendingUp } from "lucide-react";
import MindfulIllustration from "./MindfulIllustration";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TrendChartProps {
  entries: MoodEntry[];
}

type TimeRange = 7 | 30;
type ChartType = "line" | "bar";

export default function TrendChart({ entries }: TrendChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>(7);
  const [chartType, setChartType] = useState<ChartType>("line");

  // Get data for selected range
  const chartData = useMemo(() => {
    // Generate dates list for the last N days (including today)
    const dates: string[] = [];
    const dateLabels: string[] = [];
    
    for (let i = timeRange - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;
      
      dates.push(dateStr);
      
      // Label formatted as "MMM DD" (e.g. "Jul 05")
      const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      dateLabels.push(label);
    }

    // Map existing entries to the dates
    const entriesMap = new Map<string, number>();
    entries.forEach((entry) => {
      entriesMap.set(entry.date, entry.moodValue);
    });

    const values = dates.map((date) => entriesMap.get(date) ?? null);

    return {
      labels: dateLabels,
      values,
      dates,
    };
  }, [entries, timeRange]);

  const hasData = useMemo(() => {
    return chartData.values.some((v) => v !== null);
  }, [chartData]);

  // Chart styling based on theme (we use slate-500/slate-400 for high-contrast labels)
  const chartOptions: ChartOptions<"line" | "bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.95)", // slate-900
        titleColor: "#f8fafc", // slate-50
        bodyColor: "#f1f5f9", // slate-100
        borderColor: "rgba(226, 232, 240, 0.15)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 12,
        displayColors: false,
        callbacks: {
          label: (context) => {
            const val = context.parsed.y as MoodValue;
            if (val && MOODS[val]) {
              const mood = MOODS[val];
              return `Mood: ${mood.emoji} ${mood.label} (${mood.description})`;
            }
            return "";
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#64748b", // slate-500 (WCAG AA compliant)
          font: {
            family: "Inter, sans-serif",
            size: 11,
            weight: 600,
          },
        },
      },
      y: {
        min: 1,
        max: 6,
        grid: {
          color: "rgba(241, 245, 249, 0.4)", // light gray
        },
        border: {
          dash: [4, 4],
        },
        ticks: {
          stepSize: 1,
          color: "#64748b", // slate-500 (WCAG AA compliant)
          font: {
            family: "Inter, sans-serif",
            size: 11,
            weight: 600,
          },
          callback: (value) => {
            const val = value as MoodValue;
            return MOODS[val] ? `${MOODS[val].emoji} ${MOODS[val].label}` : "";
          },
        },
      },
    },
  };

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Mood Trend",
        data: chartData.values,
        borderColor: "#6366f1", // indigo-500
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return "rgba(99, 102, 241, 0.1)";
          
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(99, 102, 241, 0.35)");
          gradient.addColorStop(1, "rgba(99, 102, 241, 0.0)");
          return gradient;
        },
        fill: true,
        tension: 0.35,
        pointBackgroundColor: "#4f46e5", // indigo-600
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        spanGaps: true,
      },
    ],
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Mood Trends</h2>
          </div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Visualize your well-being over time
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Chart Type Toggle */}
          <div className="flex rounded-xl bg-slate-50 dark:bg-slate-800/50 p-1 border border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setChartType("line")}
              className={`p-1.5 rounded-lg transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                chartType === "line"
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-400"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
              title="Line Chart"
            >
              <TrendingUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`p-1.5 rounded-lg transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                chartType === "bar"
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-400"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
              title="Bar Chart"
            >
              <BarChart2 className="w-4 h-4" />
            </button>
          </div>

          {/* Time Range Selector */}
          <div className="flex rounded-xl bg-slate-50 dark:bg-slate-800/50 p-1 border border-slate-100 dark:border-slate-800 flex-1 sm:flex-initial">
            <button
              onClick={() => setTimeRange(7)}
              className={`flex-1 sm:flex-none px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                timeRange === 7
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-400"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange(30)}
              className={`flex-1 sm:flex-none px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                timeRange === 30
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-400"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              30 Days
            </button>
          </div>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full relative">
        {hasData ? (
          <div key={`${chartType}-${timeRange}`} className="w-full h-full animate-[fadeIn_0.5s_ease-out_forwards]">
            {chartType === "line" ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <Line data={data} options={chartOptions as any} />
            ) : (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <Bar data={data} options={chartOptions as any} />
            )}
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
            <MindfulIllustration />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 mt-2">
              Not enough logs yet
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
              Start logging your daily mood, and your trends will show up here over the next few days.
            </p>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

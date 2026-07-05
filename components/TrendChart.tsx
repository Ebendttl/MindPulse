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
import { MOOD_COLORS, BRAND } from "@/lib/moodColors";
import { BarChart2, TrendingUp } from "lucide-react";
import { PulseWaveIllustration } from "./MindfulIllustration";

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
      
      const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      dateLabels.push(label);
    }

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

  // Determine current theme settings dynamically at runtime for Chart.js rendering
  const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
  const tickColor = isDark ? "#9B94A8" : "#756F80";
  const gridColor = isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.04)";
  const tooltipBg = isDark ? "#1C192B" : "#FFFFFF";
  const tooltipBorder = isDark ? "#2C2842" : "#EDE6DA";
  const tooltipText = isDark ? "#F5F2ED" : "#1E1B24";

  const chartOptions: ChartOptions<"line" | "bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: tooltipBg,
        titleColor: tooltipText,
        bodyColor: tooltipText,
        borderColor: tooltipBorder,
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
          color: tickColor,
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
          color: gridColor,
          lineWidth: 1,
        },
        border: {
          dash: [4, 4],
        },
        ticks: {
          stepSize: 1,
          color: tickColor,
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

  const pointColors = chartData.values.map((v) =>
    v !== null ? MOOD_COLORS[v as MoodValue].base : "transparent"
  );

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Mood Trend",
        data: chartData.values,
        borderColor: chartType === "line"
          ? (isDark ? "rgba(108, 99, 255, 0.4)" : "rgba(108, 99, 255, 0.3)")
          : pointColors,
        borderWidth: chartType === "line" ? 3 : 1,
        backgroundColor: chartType === "line"
          ? (context: { chart: { ctx: CanvasRenderingContext2D; chartArea?: { top: number; bottom: number; left: number; right: number; width: number; height: number } } }) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) return `${BRAND.primary}0D`;
              const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
              gradient.addColorStop(0, `${BRAND.primary}26`);
              gradient.addColorStop(1, `${BRAND.primary}00`);
              return gradient;
            }
          : pointColors.map(c => c !== "transparent" ? c + "DD" : "transparent"),
        fill: chartType === "line",
        tension: 0.35,
        pointBackgroundColor: pointColors,
        pointBorderColor: pointColors.map(c => c !== "transparent" ? "#FFFFFF" : "transparent"),
        pointBorderWidth: 2,
        pointRadius: chartType === "line" ? chartData.values.map((v) => v !== null ? 6 : 0) : 0,
        pointHoverRadius: chartType === "line" ? 8 : 0,
        spanGaps: true,
        borderRadius: chartType === "bar" ? 8 : 0,
        borderCapStyle: "round" as const,
      },
    ],
  };

  const activeToggleStyle = {
    backgroundColor: BRAND.primary,
    color: "#FFFFFF",
  };
  const inactiveToggleStyle = {
    backgroundColor: "transparent",
    color: "var(--text-secondary)",
  };

  return (
    <div
      className="rounded-[20px] p-6 transition-all duration-300 w-full border h-full flex flex-col justify-between"
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5" style={{ color: BRAND.primaryEnd }} />
            <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Mood Trends</h2>
          </div>
          <p className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
            Visualize your well-being over time
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Chart Type Toggle */}
          <div className="flex rounded-xl p-1 border" style={{ backgroundColor: "var(--background)", borderColor: "var(--card-border)" }}>
            <button
              onClick={() => setChartType("line")}
              className="p-1.5 rounded-lg transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={chartType === "line" ? activeToggleStyle : inactiveToggleStyle}
              title="Line Chart"
            >
              <TrendingUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType("bar")}
              className="p-1.5 rounded-lg transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={chartType === "bar" ? activeToggleStyle : inactiveToggleStyle}
              title="Bar Chart"
            >
              <BarChart2 className="w-4 h-4" />
            </button>
          </div>

          {/* Time Range Selector */}
          <div className="flex rounded-xl p-1 border flex-1 sm:flex-initial" style={{ backgroundColor: "var(--background)", borderColor: "var(--card-border)" }}>
            <button
              onClick={() => setTimeRange(7)}
              className="flex-1 sm:flex-none px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={timeRange === 7 ? activeToggleStyle : inactiveToggleStyle}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange(30)}
              className="flex-1 sm:flex-none px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={timeRange === 30 ? activeToggleStyle : inactiveToggleStyle}
            >
              30 Days
            </button>
          </div>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full relative flex-grow flex flex-col justify-center min-h-[260px]">
        {hasData ? (
          <div key={`${chartType}-${timeRange}`} className="w-full h-full" style={{ animation: "fadeIn 0.5s ease-out forwards" }}>
            {chartType === "line" ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <Line data={data} options={chartOptions as any} />
            ) : (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <Bar data={data} options={chartOptions as any} />
            )}
          </div>
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 rounded-[20px] border border-dashed"
            style={{
              backgroundColor: "var(--background)",
              borderColor: "var(--card-border)",
            }}
          >
            <PulseWaveIllustration />
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
              Not enough logs yet
            </p>
            <p className="text-xs max-w-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Start logging your daily mood, and your trends will show up here over the next few days.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

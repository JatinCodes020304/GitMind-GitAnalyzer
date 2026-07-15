import { useMemo, useState } from "react";
import { Flame, Trophy, Calendar } from "lucide-react";
import type { ContributionCalendar, ContributionDay } from "@/types/github";

interface ContributionHeatmapProps {
  calendar: ContributionCalendar;
}

const LEVEL_COLORS = [
  "bg-slate-800/60", // 0
  "bg-emerald-900/70", // 1
  "bg-emerald-700/80", // 2
  "bg-emerald-500/90", // 3
  "bg-emerald-400", // 4
];

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

function chunkIntoWeeks(days: ContributionDay[]): ContributionDay[][] {
  if (days.length === 0) return [];

  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  // Pad the first week so it starts on a Sunday, matching GitHub's layout
  const firstDate = new Date(days[0].date + "T00:00:00Z");
  const firstDayOfWeek = firstDate.getUTCDay(); // 0 = Sunday
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push({ date: "", count: -1, level: -1 });
  }

  for (const day of days) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ date: "", count: -1, level: -1 });
    }
    weeks.push(currentWeek);
  }

  return weeks;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00Z");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export default function ContributionHeatmap({ calendar }: ContributionHeatmapProps) {
  const [hovered, setHovered] = useState<ContributionDay | null>(null);
  const weeks = useMemo(() => chunkIntoWeeks(calendar.days), [calendar.days]);

  // Figure out which weeks should get a month label (first week that
  // contains the 1st of a new month)
  const monthMarkers = useMemo(() => {
    const markers: { weekIndex: number; label: string }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, weekIndex) => {
      const firstRealDay = week.find((d) => d.date);
      if (!firstRealDay) return;
      const month = new Date(firstRealDay.date + "T00:00:00Z").getUTCMonth();
      if (month !== lastMonth) {
        markers.push({ weekIndex, label: MONTH_LABELS[month] });
        lastMonth = month;
      }
    });
    return markers;
  }, [weeks]);

  return (
    <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-slate-500" />
          <h3 className="text-sm font-semibold text-white">
            {calendar.totalContributions.toLocaleString()} contributions in the last year
          </h3>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-orange-400" />
            <span>
              <span className="text-white font-semibold">{calendar.currentStreak}</span> day streak
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Trophy className="h-3.5 w-3.5 text-amber-400" />
            <span>
              Longest: <span className="text-white font-semibold">{calendar.longestStreak}</span> days
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="inline-flex flex-col gap-1 min-w-full">
          {/* Month labels */}
          <div className="flex gap-[3px] ml-8 text-[10px] text-slate-500 relative h-3">
            {monthMarkers.map((m) => (
              <span
                key={`${m.label}-${m.weekIndex}`}
                className="absolute"
                style={{ left: `${m.weekIndex * 13}px` }}
              >
                {m.label}
              </span>
            ))}
          </div>

          <div className="flex gap-[3px]">
            {/* Day-of-week labels */}
            <div className="flex flex-col gap-[3px] mr-1 text-[10px] text-slate-500 w-7">
              {DAY_LABELS.map((label, i) => (
                <div key={i} className="h-[10px] leading-none flex items-center">
                  {label}
                </div>
              ))}
            </div>

            {/* Weeks grid */}
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((day, dayIndex) => {
                  if (!day.date) {
                    return <div key={dayIndex} className="w-[10px] h-[10px]" />;
                  }
                  return (
                    <div
                      key={dayIndex}
                      className={`w-[10px] h-[10px] rounded-[2px] ${LEVEL_COLORS[day.level]} hover:ring-1 hover:ring-white/50 cursor-pointer transition-all`}
                      onMouseEnter={() => setHovered(day)}
                      onMouseLeave={() => setHovered(null)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="text-xs text-slate-500 h-4">
          {hovered
            ? `${hovered.count} contribution${hovered.count === 1 ? "" : "s"} on ${formatDate(hovered.date)}`
            : calendar.busiestDay !== "N/A"
              ? `Busiest day: ${formatDate(calendar.busiestDay)} (${calendar.busiestDayCount} contributions)`
              : ""}
        </div>
        <div className="flex items-center gap-1 text-[10px] text-slate-500">
          <span>Less</span>
          {LEVEL_COLORS.map((color, i) => (
            <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${color}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

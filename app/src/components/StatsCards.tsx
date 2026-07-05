import { Star, GitFork, CircleDot, HardDrive } from "lucide-react";
import type { RepositoryStats } from "@/types/github";

interface StatsCardsProps {
  stats: RepositoryStats;
}

const statItems = [
  {
    key: "totalStars" as keyof RepositoryStats,
    label: "Total Stars",
    icon: Star,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    key: "totalForks" as keyof RepositoryStats,
    label: "Total Forks",
    icon: GitFork,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    key: "totalOpenIssues" as keyof RepositoryStats,
    label: "Open Issues",
    icon: CircleDot,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
  {
    key: "averageRepoSize" as keyof RepositoryStats,
    label: "Avg Size (KB)",
    icon: HardDrive,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
];

export default function StatsCards({ stats }: StatsCardsProps) {
  const formatValue = (value: number | string): string => {
    if (typeof value === "number") {
      if (value >= 1000) {
        return (value / 1000).toFixed(1) + "k";
      }
      return value.toLocaleString();
    }
    return String(value);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <div
          key={item.key}
          className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-4 hover:bg-slate-900/60 transition-all duration-200 group"
        >
          <div
            className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${item.bg} ${item.color} mb-3`}
          >
            <item.icon className="h-4.5 w-4.5" />
          </div>
          <div className="text-2xl font-bold text-white group-hover:scale-105 transition-transform origin-left">
            {formatValue(stats[item.key])}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

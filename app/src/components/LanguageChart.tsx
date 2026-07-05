import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import type { LanguageStats } from "@/types/github";

interface LanguageChartProps {
  languageStats: LanguageStats[];
}

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3776ab",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Dart: "#00B4AB",
  Scala: "#c22d40",
  R: "#198CE7",
  Julia: "#a270ba",
  Haskell: "#5e5086",
  Lua: "#000080",
  Perl: "#0298c3",
  Elixir: "#6e4a7e",
  Clojure: "#db5855",
  OCaml: "#3be133",
  Elm: "#60B5CC",
  Erlang: "#B83998",
  Fortran: "#4d41b1",
  Assembly: "#6E4C13",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Angular: "#dd0031",
  React: "#61dafb",
  "Objective-C": "#438eff",
  CoffeeScript: "#244776",
  Groovy: "#e69f56",
  Matlab: "#e16737",
  PowerShell: "#012456",
  VBA: "#867db1",
  SQL: "#e38c00",
};

function getLanguageColor(language: string): string {
  return LANGUAGE_COLORS[language] || "#6366f1";
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: LanguageStats;
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 shadow-xl">
      <div className="flex items-center gap-2">
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: getLanguageColor(data.language) }}
        />
        <span className="text-white font-medium text-sm">{data.language}</span>
      </div>
      <div className="text-slate-400 text-xs mt-1">
        {data.repositoryCount} repos ({data.percentage}%)
      </div>
      <div className="text-slate-500 text-xs">
        {(data.totalSize / 1024).toFixed(1)} MB total
      </div>
    </div>
  );
}

export default function LanguageChart({ languageStats }: LanguageChartProps) {
  if (!languageStats || languageStats.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Language Distribution
        </h3>
        <div className="h-64 flex items-center justify-center text-slate-500 text-sm">
          No language data available
        </div>
      </div>
    );
  }

  const chartData = languageStats.map((stat) => ({
    ...stat,
    fill: getLanguageColor(stat.language),
  }));

  // Top languages bar chart data
  const topLanguages = [...languageStats]
    .sort((a, b) => b.repositoryCount - a.repositoryCount)
    .slice(0, 8);

  const maxCount = Math.max(...topLanguages.map((l) => l.repositoryCount));

  return (
    <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Language Distribution
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={2}
                dataKey="repositoryCount"
                nameKey="language"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value: string) => (
                  <span className="text-slate-400 text-xs">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Top Languages */}
        <div className="space-y-3">
          <p className="text-sm text-slate-500 mb-3">Top Languages</p>
          {topLanguages.map((lang) => (
            <div key={lang.language} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: getLanguageColor(lang.language),
                    }}
                  />
                  <span className="text-slate-300">{lang.language}</span>
                </div>
                <span className="text-slate-500">
                  {lang.repositoryCount} repos
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${(lang.repositoryCount / maxCount) * 100}%`,
                    backgroundColor: getLanguageColor(lang.language),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

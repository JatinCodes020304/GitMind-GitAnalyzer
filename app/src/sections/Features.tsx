import { BarChart3, GitBranch, Code2, Activity, Users, Clock } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Profile Analytics",
    description:
      "Get detailed insights into any GitHub profile including followers, following, repositories, and account history.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    icon: GitBranch,
    title: "Repository Insights",
    description:
      "Analyze repositories with metrics on stars, forks, issues, and languages used across all public repos.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: Code2,
    title: "Language Distribution",
    description:
      "Visualize programming language usage with beautiful charts showing which languages a developer uses most.",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
  },
  {
    icon: Activity,
    title: "Activity Tracking",
    description:
      "View recent public events and contributions to understand a developer's coding patterns and engagement.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    icon: Users,
    title: "Community Metrics",
    description:
      "Understand the social aspect with follower counts, following relationships, and community engagement.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  {
    icon: Clock,
    title: "Real-time Data",
    description:
      "All data is fetched directly from GitHub's API ensuring you always see the most up-to-date information.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-slate-800" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything You Need to Know
          </h2>
          <p className="text-lg text-slate-400">
            Comprehensive GitHub profile analysis with beautiful visualizations
            and real-time data from the GitHub API.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative p-6 rounded-2xl border border-slate-800/60 bg-slate-900/40 hover:bg-slate-900/80 transition-all duration-300 hover:border-slate-700/80"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bg} ${feature.color} mb-4`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Hover glow */}
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${feature.bg} blur-2xl -z-10`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

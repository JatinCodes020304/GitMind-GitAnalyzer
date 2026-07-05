import { GitCommit, GitBranch, Star, BookOpen, Tag, AlertCircle } from "lucide-react";
import type { Event } from "@/types/github";

interface ActivityFeedProps {
  events: Event[];
}

const EVENT_CONFIG: Record<
  string,
  { icon: typeof GitCommit; label: string; color: string; bg: string }
> = {
  PushEvent: {
    icon: GitCommit,
    label: "pushed to",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  CreateEvent: {
    icon: GitBranch,
    label: "created",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  WatchEvent: {
    icon: Star,
    label: "starred",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  ForkEvent: {
    icon: BookOpen,
    label: "forked",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
  ReleaseEvent: {
    icon: Tag,
    label: "released",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  IssuesEvent: {
    icon: AlertCircle,
    label: "issue activity on",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
};

function getEventConfig(eventType: string) {
  return (
    EVENT_CONFIG[eventType] || {
      icon: GitCommit,
      label: "activity on",
      color: "text-slate-400",
      bg: "bg-slate-500/10",
    }
  );
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

function formatEventType(type: string): string {
  return type.replace("Event", "");
}

export default function ActivityFeed({ events }: ActivityFeedProps) {
  if (!events || events.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Recent Activity
        </h3>
        <div className="text-center py-12 text-slate-500 text-sm">
          No recent activity found
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <span className="text-sm text-slate-500">
          {events.length} events
        </span>
      </div>

      <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
        {events.slice(0, 15).map((event, index) => {
          const config = getEventConfig(event.type);
          const Icon = config.icon;

          return (
            <div
              key={`${event.id}-${index}`}
              className="flex items-start gap-3 py-3 px-3 rounded-lg hover:bg-slate-800/30 transition-colors"
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-lg ${config.bg} flex-shrink-0 mt-0.5`}
              >
                <Icon className={`h-4 w-4 ${config.color}`} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-300 leading-snug">
                  <span className="text-slate-500">{config.label}</span>{" "}
                  {event.repoName && (
                    <span className="font-medium text-white">
                      {event.repoName}
                    </span>
                  )}
                  {event.pushSize && event.pushSize > 0 && (
                    <span className="text-slate-500 ml-1">
                      ({event.pushSize} commit{event.pushSize > 1 ? "s" : ""})
                    </span>
                  )}
                  {event.ref && (
                    <span className="text-slate-500 ml-1">
                      on {event.ref.replace("refs/heads/", "")}
                    </span>
                  )}
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  {formatEventType(event.type)} • {formatRelativeTime(event.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

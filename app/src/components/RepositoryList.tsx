import { Star, GitFork, AlertCircle, Clock, ChevronRight } from "lucide-react";
import type { Repository } from "@/types/github";
import { useState } from "react";

interface RepositoryListProps {
  repositories: Repository[];
}

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "bg-yellow-500/20 text-yellow-400",
  TypeScript: "bg-blue-500/20 text-blue-400",
  Python: "bg-blue-600/20 text-blue-300",
  Java: "bg-orange-500/20 text-orange-400",
  "C++": "bg-pink-500/20 text-pink-400",
  C: "bg-gray-500/20 text-gray-400",
  "C#": "bg-green-600/20 text-green-400",
  Go: "bg-cyan-500/20 text-cyan-400",
  Rust: "bg-orange-700/20 text-orange-300",
  Ruby: "bg-red-700/20 text-red-400",
  PHP: "bg-indigo-500/20 text-indigo-400",
  Swift: "bg-orange-400/20 text-orange-300",
  Kotlin: "bg-purple-500/20 text-purple-400",
  HTML: "bg-red-500/20 text-red-400",
  CSS: "bg-blue-800/20 text-blue-300",
  Shell: "bg-green-500/20 text-green-400",
  Vue: "bg-emerald-500/20 text-emerald-400",
  Svelte: "bg-orange-600/20 text-orange-400",
  Dart: "bg-cyan-600/20 text-cyan-400",
  Scala: "bg-red-600/20 text-red-300",
};

function getLanguageStyle(language: string | null): string {
  if (!language) return "bg-slate-700/30 text-slate-500";
  return LANGUAGE_COLORS[language] || "bg-indigo-500/20 text-indigo-400";
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 30) return `${diffDays}d ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

export default function RepositoryList({ repositories }: RepositoryListProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedRepos = showAll ? repositories : repositories.slice(0, 8);
  const hasMore = repositories.length > 8;

  if (!repositories || repositories.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Repositories</h3>
        <div className="text-center py-12 text-slate-500 text-sm">
          No public repositories found
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Repositories</h3>
        <span className="text-sm text-slate-500">
          {repositories.length} total
        </span>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
        {displayedRepos.map((repo) => (
          <a
            key={repo.id}
            href={repo.htmlUrl || `#`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 p-4 rounded-xl border border-slate-800/40 bg-slate-800/20 hover:bg-slate-800/40 hover:border-slate-700/60 transition-all duration-200"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-white text-sm group-hover:text-indigo-400 transition-colors truncate">
                  {repo.name}
                </h4>
                {repo.fork && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-400">
                    fork
                  </span>
                )}
                {repo.archived && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400">
                    archived
                  </span>
                )}
              </div>

              {repo.description && (
                <p className="text-xs text-slate-400 line-clamp-2 mb-2">
                  {repo.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                {repo.language && (
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getLanguageStyle(
                      repo.language
                    )}`}
                  >
                    {repo.language}
                  </span>
                )}
                {repo.stargazersCount > 0 && (
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-slate-600" />
                    {repo.stargazersCount.toLocaleString()}
                  </span>
                )}
                {repo.forksCount > 0 && (
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3 w-3 text-slate-600" />
                    {repo.forksCount.toLocaleString()}
                  </span>
                )}
                {repo.openIssuesCount > 0 && (
                  <span className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 text-slate-600" />
                    {repo.openIssuesCount.toLocaleString()}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-slate-600" />
                  {formatRelativeTime(repo.pushedAt)}
                </span>
              </div>
            </div>

            <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
          </a>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-4 py-2.5 rounded-xl border border-slate-700/50 text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
        >
          {showAll
            ? "Show less"
            : `Show all ${repositories.length} repositories`}
        </button>
      )}
    </div>
  );
}

import { Star, GitFork, AlertCircle, Clock, ChevronRight, Search } from "lucide-react";
import type { Repository } from "@/types/github";
import { useMemo, useState } from "react";

interface RepositoryListProps {
  repositories: Repository[];
}

type SortOption = "updated" | "stars" | "name";

const PAGE_SIZE = 12;

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
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("updated");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredSorted = useMemo(() => {
    const term = search.trim().toLowerCase();
    let result = repositories;

    if (term) {
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(term) ||
          (r.language && r.language.toLowerCase().includes(term)) ||
          (r.description && r.description.toLowerCase().includes(term))
      );
    }

    result = [...result].sort((a, b) => {
      if (sortBy === "stars") return b.stargazersCount - a.stargazersCount;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      // "updated"
      return new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime();
    });

    return result;
  }, [repositories, search, sortBy]);

  const displayedRepos = filteredSorted.slice(0, visibleCount);
  const hasMore = filteredSorted.length > visibleCount;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setVisibleCount(PAGE_SIZE); // reset pagination when filters change
  };

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    setVisibleCount(PAGE_SIZE);
  };

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
          {search ? `${filteredSorted.length} of ${repositories.length}` : `${repositories.length} total`}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search repos by name, language, description..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-800/60 bg-slate-800/20 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-600 transition-colors"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value as SortOption)}
          className="px-3 py-2 rounded-lg border border-slate-800/60 bg-slate-800/20 text-sm text-slate-300 focus:outline-none focus:border-slate-600 transition-colors"
        >
          <option value="updated">Recently updated</option>
          <option value="stars">Most stars</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>

      {filteredSorted.length === 0 && (
        <div className="text-center py-12 text-slate-500 text-sm">
          No repositories match "{search}"
        </div>
      )}

      <div className="space-y-3 pr-1">
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
          onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          className="w-full mt-4 py-2.5 rounded-xl border border-slate-700/50 text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
        >
          Load {Math.min(PAGE_SIZE, filteredSorted.length - visibleCount)} more
          ({filteredSorted.length - visibleCount} remaining)
        </button>
      )}
      {!hasMore && visibleCount > PAGE_SIZE && filteredSorted.length > PAGE_SIZE && (
        <button
          onClick={() => setVisibleCount(PAGE_SIZE)}
          className="w-full mt-4 py-2.5 rounded-xl border border-slate-700/50 text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
        >
          Show less
        </button>
      )}
    </div>
  );
}

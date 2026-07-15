import { useParams, useNavigate } from "react-router-dom";
import { useGitHubAnalysis } from "@/hooks/useGitHubAnalysis";
import { useContributionCalendar } from "@/hooks/useContributionCalendar";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";
import ProfileCard from "@/components/ProfileCard";
import StatsCards from "@/components/StatsCards";
import LanguageChart from "@/components/LanguageChart";
import RepositoryList from "@/components/RepositoryList";
import ActivityFeed from "@/components/ActivityFeed";
import ErrorState from "@/components/ErrorState";
import ContributionHeatmap from "@/components/ContributionHeatmap";
import { useEffect } from "react";

export default function Dashboard() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  const {
    data: analysis,
    isLoading,
    error,
    refetch,
  } = useGitHubAnalysis(username || null);

  // Heatmap is fetched separately and fails independently - a missing
  // GITHUB_TOKEN on the server shouldn't take down the whole dashboard.
  const { data: contributions, isLoading: contributionsLoading } =
    useContributionCalendar(username || null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!username) {
    navigate("/search");
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate("/search")}
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Search
            </button>
          </div>

          {isLoading && <DashboardSkeleton />}

          {error && (
            <ErrorState
              error={error}
              username={username}
              onRetry={() => refetch()}
            />
          )}

          {analysis && (
            <div className="space-y-6">
              {/* Profile */}
              <ProfileCard profile={analysis.profile} />

              {/* Stats */}
              <StatsCards stats={analysis.repositoryStats} />

              {/* Additional Stats Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-4 text-center">
                  <div className="text-lg font-bold text-white">
                    {analysis.repositoryStats.totalRepositories}
                  </div>
                  <div className="text-xs text-slate-500">Total Repos</div>
                </div>
                <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-4 text-center">
                  <div className="text-lg font-bold text-white">
                    {analysis.repositoryStats.originalRepositories}
                  </div>
                  <div className="text-xs text-slate-500">Original</div>
                </div>
                <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-4 text-center">
                  <div className="text-lg font-bold text-white">
                    {analysis.repositoryStats.forkedRepositories}
                  </div>
                  <div className="text-xs text-slate-500">Forked</div>
                </div>
                <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-4 text-center">
                  <div className="text-lg font-bold text-white">
                    {analysis.repositoryStats.mostUsedLanguage}
                  </div>
                  <div className="text-xs text-slate-500">Top Language</div>
                </div>
              </div>

              {/* Contribution Heatmap */}
              {contributionsLoading && (
                <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-5 h-40 animate-pulse" />
              )}
              {contributions && <ContributionHeatmap calendar={contributions} />}

              {/* Language Chart + Repositories */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LanguageChart languageStats={analysis.languageStats} />
                <RepositoryList repositories={analysis.repositories} />
              </div>

              {/* Activity */}
              <ActivityFeed events={analysis.recentEvents} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

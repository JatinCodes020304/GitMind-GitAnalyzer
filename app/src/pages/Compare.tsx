import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swords, ArrowRight, AlertCircle, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useGitHubAnalysis } from "@/hooks/useGitHubAnalysis";
import { useContributionCalendar } from "@/hooks/useContributionCalendar";
import type { GitHubAnalysis, ContributionCalendar } from "@/types/github";

const USERNAME_REGEX = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

export default function ComparePage() {
  const { userA, userB } = useParams<{ userA?: string; userB?: string }>();

  if (userA && userB) {
    return <CompareResults userA={userA} userB={userB} />;
  }
  return <CompareForm />;
}

function CompareForm() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedA = a.trim();
    const trimmedB = b.trim();

    if (!trimmedA || !trimmedB) {
      setError("Enter both usernames to compare");
      return;
    }
    if (!USERNAME_REGEX.test(trimmedA) || !USERNAME_REGEX.test(trimmedB)) {
      setError("Invalid GitHub username format");
      return;
    }
    if (trimmedA.toLowerCase() === trimmedB.toLowerCase()) {
      setError("Enter two different usernames");
      return;
    }
    setError("");
    navigate(`/compare/${trimmedA}/${trimmedB}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <div className="w-full max-w-lg">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-6">
              <Swords className="h-8 w-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Compare Two Profiles
            </h1>
            <p className="text-slate-400">
              See how two GitHub developers stack up head-to-head
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={a}
              onChange={(e) => {
                setA(e.target.value);
                if (error) setError("");
              }}
              placeholder="First username..."
              className="w-full px-4 py-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
              autoFocus
            />
            <div className="flex items-center justify-center text-slate-600 text-sm font-medium">
              VS
            </div>
            <input
              type="text"
              value={b}
              onChange={(e) => {
                setB(e.target.value);
                if (error) setError("");
              }}
              placeholder="Second username..."
              className="w-full px-4 py-3.5 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200"
            />

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all duration-200"
            >
              Compare
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

interface CompareResultsProps {
  userA: string;
  userB: string;
}

function CompareResults({ userA, userB }: CompareResultsProps) {
  const navigate = useNavigate();
  const analysisA = useGitHubAnalysis(userA);
  const analysisB = useGitHubAnalysis(userB);
  const contribA = useContributionCalendar(userA);
  const contribB = useContributionCalendar(userB);

  const isLoading = analysisA.isLoading || analysisB.isLoading;
  const hasError = analysisA.error || analysisB.error;

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/compare")}
            className="text-sm text-slate-500 hover:text-white transition-colors mb-6"
          >
            &larr; Compare different profiles
          </button>

          {isLoading && (
            <div className="text-center py-24 text-slate-500">Loading comparison...</div>
          )}

          {hasError && !isLoading && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm max-w-md mx-auto">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              Couldn't load one or both profiles. Check the usernames and try again.
            </div>
          )}

          {analysisA.data && analysisB.data && (
            <>
              {/* Head-to-head header cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <ProfileHeader analysis={analysisA.data} align="left" />
                <ProfileHeader analysis={analysisB.data} align="right" />
              </div>

              <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 divide-y divide-slate-800/60">
                <StatRow
                  label="Followers"
                  valueA={analysisA.data.profile.followers}
                  valueB={analysisB.data.profile.followers}
                />
                <StatRow
                  label="Public Repos"
                  valueA={analysisA.data.profile.publicRepos}
                  valueB={analysisB.data.profile.publicRepos}
                />
                <StatRow
                  label="Total Stars"
                  valueA={analysisA.data.repositoryStats.totalStars}
                  valueB={analysisB.data.repositoryStats.totalStars}
                />
                <StatRow
                  label="Total Forks"
                  valueA={analysisA.data.repositoryStats.totalForks}
                  valueB={analysisB.data.repositoryStats.totalForks}
                />
                <StatRow
                  label="Original Repos"
                  valueA={analysisA.data.repositoryStats.originalRepositories}
                  valueB={analysisB.data.repositoryStats.originalRepositories}
                />
                {contribA.data && contribB.data && (
                  <>
                    <StatRow
                      label="Contributions (1yr)"
                      valueA={contribA.data.totalContributions}
                      valueB={contribB.data.totalContributions}
                    />
                    <StatRow
                      label="Current Streak"
                      valueA={contribA.data.currentStreak}
                      valueB={contribB.data.currentStreak}
                      suffix=" days"
                    />
                    <StatRow
                      label="Longest Streak"
                      valueA={contribA.data.longestStreak}
                      valueB={contribB.data.longestStreak}
                      suffix=" days"
                    />
                  </>
                )}
                <TopLanguageRow
                  labelA={analysisA.data.languageStats[0]?.language ?? "N/A"}
                  labelB={analysisB.data.languageStats[0]?.language ?? "N/A"}
                />
              </div>

              <OverallWinner
                analysisA={analysisA.data}
                analysisB={analysisB.data}
                contribA={contribA.data}
                contribB={contribB.data}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function ProfileHeader({
  analysis,
  align,
}: {
  analysis: GitHubAnalysis;
  align: "left" | "right";
}) {
  const p = analysis.profile;
  return (
    <div
      className={`rounded-2xl border border-slate-800/60 bg-slate-900/40 p-5 flex items-center gap-4 ${
        align === "right" ? "flex-row-reverse text-right" : ""
      }`}
    >
      {p.avatarUrl && (
        <img
          src={p.avatarUrl}
          alt={p.login}
          className="w-14 h-14 rounded-full border border-slate-700/60 flex-shrink-0"
        />
      )}
      <div className="min-w-0">
        <div className="font-semibold text-white truncate">{p.name || p.login}</div>
        <div className="text-sm text-slate-500 truncate">@{p.login}</div>
      </div>
    </div>
  );
}

function StatRow({
  label,
  valueA,
  valueB,
  suffix = "",
}: {
  label: string;
  valueA: number;
  valueB: number;
  suffix?: string;
}) {
  const aWins = valueA > valueB;
  const bWins = valueB > valueA;

  return (
    <div className="grid grid-cols-3 items-center px-5 py-3.5 text-sm">
      <div
        className={`text-left font-semibold ${aWins ? "text-emerald-400" : "text-slate-300"}`}
      >
        {valueA.toLocaleString()}
        {suffix}
        {aWins && <Trophy className="inline h-3.5 w-3.5 ml-1.5 -mt-0.5" />}
      </div>
      <div className="text-center text-slate-500 text-xs uppercase tracking-wide">
        {label}
      </div>
      <div
        className={`text-right font-semibold ${bWins ? "text-emerald-400" : "text-slate-300"}`}
      >
        {bWins && <Trophy className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5" />}
        {valueB.toLocaleString()}
        {suffix}
      </div>
    </div>
  );
}

function TopLanguageRow({ labelA, labelB }: { labelA: string; labelB: string }) {
  return (
    <div className="grid grid-cols-3 items-center px-5 py-3.5 text-sm">
      <div className="text-left font-semibold text-slate-300">{labelA}</div>
      <div className="text-center text-slate-500 text-xs uppercase tracking-wide">
        Top Language
      </div>
      <div className="text-right font-semibold text-slate-300">{labelB}</div>
    </div>
  );
}

function OverallWinner({
  analysisA,
  analysisB,
  contribA,
  contribB,
}: {
  analysisA: GitHubAnalysis;
  analysisB: GitHubAnalysis;
  contribA?: ContributionCalendar;
  contribB?: ContributionCalendar;
}) {
  let scoreA = 0;
  let scoreB = 0;

  const compare = (a: number, b: number) => {
    if (a > b) scoreA++;
    else if (b > a) scoreB++;
  };

  compare(analysisA.profile.followers, analysisB.profile.followers);
  compare(analysisA.repositoryStats.totalStars, analysisB.repositoryStats.totalStars);
  compare(analysisA.repositoryStats.totalForks, analysisB.repositoryStats.totalForks);
  compare(analysisA.repositoryStats.originalRepositories, analysisB.repositoryStats.originalRepositories);
  if (contribA && contribB) {
    compare(contribA.totalContributions, contribB.totalContributions);
    compare(contribA.longestStreak, contribB.longestStreak);
  }

  if (scoreA === scoreB) return null;

  const winner = scoreA > scoreB ? analysisA.profile : analysisB.profile;

  return (
    <div className="mt-6 text-center py-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
      <Trophy className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
      <div className="text-white font-semibold">
        {winner.name || winner.login} wins {Math.max(scoreA, scoreB)} of {scoreA + scoreB} categories
      </div>
      <div className="text-xs text-slate-500 mt-1">
        Based on followers, stars, forks, repos, and activity — not a measure of skill.
      </div>
    </div>
  );
}

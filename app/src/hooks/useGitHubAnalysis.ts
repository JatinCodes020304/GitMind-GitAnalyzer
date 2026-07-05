import { useQuery } from "@tanstack/react-query";
import { fetchGitHubAnalysis } from "@/api/githubApi";
import type { GitHubAnalysis } from "@/types/github";

const QUERY_KEY = "github-analysis";

export function useGitHubAnalysis(username: string | null) {
  return useQuery<GitHubAnalysis, Error>({
    queryKey: [QUERY_KEY, username],
    queryFn: () => {
      if (!username) throw new Error("Username is required");
      return fetchGitHubAnalysis(username);
    },
    enabled: !!username && username.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      if (error.message?.includes("not found")) return false;
      return failureCount < 2;
    },
  });
}

import { useQuery } from "@tanstack/react-query";
import { fetchContributionCalendar } from "@/api/githubApi";
import type { ContributionCalendar } from "@/types/github";

const QUERY_KEY = "github-contributions";

export function useContributionCalendar(username: string | null) {
  return useQuery<ContributionCalendar, Error>({
    queryKey: [QUERY_KEY, username],
    queryFn: () => {
      if (!username) throw new Error("Username is required");
      return fetchContributionCalendar(username);
    },
    enabled: !!username && username.length > 0,
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error.message?.includes("not found")) return false;
      return failureCount < 2;
    },
  });
}

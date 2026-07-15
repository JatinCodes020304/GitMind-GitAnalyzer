import axios from "axios";
import type { GitHubAnalysis, ApiError, ContributionCalendar } from "@/types/github";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

export async function fetchGitHubAnalysis(username: string): Promise<GitHubAnalysis> {
  const response = await apiClient.get<GitHubAnalysis>(`/api/github/${username}`);
  return response.data;
}

export async function fetchContributionCalendar(username: string): Promise<ContributionCalendar> {
  const response = await apiClient.get<ContributionCalendar>(`/api/github/${username}/contributions`);
  return response.data;
}

export function isApiError(error: unknown): error is { response: { data: ApiError } } {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as Record<string, unknown>).response === "object" &&
    (error as Record<string, unknown>).response !== null &&
    "data" in ((error as Record<string, unknown>).response as object)
  );
}

export { API_BASE_URL };

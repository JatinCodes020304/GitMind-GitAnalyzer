export interface Profile {
  id: number;
  login: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string | null;
  htmlUrl: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  twitterUsername: string | null;
  publicRepos: number;
  publicGists: number;
  followers: number;
  following: number;
  createdAt: string;
  updatedAt: string;
}

export interface Repository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string | null;
  language: string | null;
  forksCount: number;
  stargazersCount: number;
  watchersCount: number;
  openIssuesCount: number;
  size: number;
  fork: boolean;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  defaultBranch: string;
  licenseName: string | null;
  ownerLogin: string | null;
}

export interface Event {
  id: string;
  type: string;
  actorLogin: string | null;
  actorAvatarUrl: string | null;
  repoName: string | null;
  repoUrl: string | null;
  ref: string | null;
  refType: string | null;
  description: string | null;
  pushSize: number | null;
  isPublic: boolean;
  createdAt: string;
}

export interface LanguageStats {
  language: string;
  repositoryCount: number;
  totalSize: number;
  percentage: number;
}

export interface RepositoryStats {
  totalStars: number;
  totalForks: number;
  totalWatchers: number;
  totalOpenIssues: number;
  averageRepoSize: number;
  mostUsedLanguage: string;
  largestRepository: string;
  largestRepositorySize: number;
  totalRepositories: number;
  originalRepositories: number;
  forkedRepositories: number;
  archivedRepositories: number;
}

export interface GitHubAnalysis {
  profile: Profile;
  repositories: Repository[];
  languageStats: LanguageStats[];
  repositoryStats: RepositoryStats;
  recentEvents: Event[];
}

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface ContributionCalendar {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  busiestDay: string;
  busiestDayCount: number;
  days: ContributionDay[];
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

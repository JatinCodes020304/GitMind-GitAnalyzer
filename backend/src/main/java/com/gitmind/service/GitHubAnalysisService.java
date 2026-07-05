package com.gitmind.service;

import com.gitmind.client.GitHubApiClient;
import com.gitmind.dto.*;
import com.gitmind.mapper.EventMapper;
import com.gitmind.mapper.ProfileMapper;
import com.gitmind.mapper.RepositoryMapper;
import com.gitmind.model.GitHubEvent;
import com.gitmind.model.GitHubProfile;
import com.gitmind.model.GitHubRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service that orchestrates GitHub data fetching and analysis.
 * Aggregates profile, repositories, events, and computes statistics.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class GitHubAnalysisService {

    private final GitHubApiClient gitHubApiClient;
    private final ProfileMapper profileMapper;
    private final RepositoryMapper repositoryMapper;
    private final EventMapper eventMapper;

    /**
     * Analyzes a GitHub user's profile comprehensively.
     *
     * @param username the GitHub username to analyze
     * @return comprehensive analysis DTO
     */
    public GitHubAnalysisDto analyzeUser(String username) {
        log.info("Starting analysis for user: {}", username);
        long startTime = System.currentTimeMillis();

        // Fetch all data in parallel
        GitHubProfile profile = gitHubApiClient.fetchUserProfile(username);
        List<GitHubRepository> repositories = gitHubApiClient.fetchUserRepositories(username);
        List<GitHubEvent> events = gitHubApiClient.fetchUserEvents(username);

        // Map to DTOs
        ProfileDto profileDto = profileMapper.toDto(profile);
        List<RepositoryDto> repositoryDtos = repositories.stream()
                .map(repositoryMapper::toDto)
                .collect(Collectors.toList());
        List<EventDto> eventDtos = events.stream()
                .map(eventMapper::toDto)
                .collect(Collectors.toList());

        // Compute statistics
        List<LanguageStatsDto> languageStats = computeLanguageStats(repositories);
        RepositoryStatsDto repositoryStats = computeRepositoryStats(repositories);

        GitHubAnalysisDto result = GitHubAnalysisDto.builder()
                .profile(profileDto)
                .repositories(repositoryDtos)
                .languageStats(languageStats)
                .repositoryStats(repositoryStats)
                .recentEvents(eventDtos)
                .build();

        long duration = System.currentTimeMillis() - startTime;
        log.info("Analysis completed for user: {} in {}ms", username, duration);

        return result;
    }

    /**
     * Computes language distribution statistics from repositories.
     */
    private List<LanguageStatsDto> computeLanguageStats(List<GitHubRepository> repositories) {
        if (repositories == null || repositories.isEmpty()) {
            return Collections.emptyList();
        }

        // Count repositories per language
        Map<String, Integer> repoCountByLanguage = new HashMap<>();
        Map<String, Long> totalSizeByLanguage = new HashMap<>();

        for (GitHubRepository repo : repositories) {
            String language = repo.getLanguage();
            if (language != null && !language.isEmpty()) {
                repoCountByLanguage.merge(language, 1, Integer::sum);
                totalSizeByLanguage.merge(language, repo.getSize() != null ? repo.getSize() : 0, Long::sum);
            }
        }

        int totalReposWithLanguage = repoCountByLanguage.values().stream()
                .mapToInt(Integer::intValue)
                .sum();

        if (totalReposWithLanguage == 0) {
            return Collections.emptyList();
        }

        return repoCountByLanguage.entrySet().stream()
                .map(entry -> {
                    String lang = entry.getKey();
                    int count = entry.getValue();
                    return LanguageStatsDto.builder()
                            .language(lang)
                            .repositoryCount(count)
                            .totalSize(totalSizeByLanguage.getOrDefault(lang, 0L))
                            .percentage(Math.round((count * 100.0 / totalReposWithLanguage) * 100.0) / 100.0)
                            .build();
                })
                .sorted((a, b) -> Integer.compare(b.getRepositoryCount(), a.getRepositoryCount()))
                .collect(Collectors.toList());
    }

    /**
     * Computes aggregated repository statistics.
     */
    private RepositoryStatsDto computeRepositoryStats(List<GitHubRepository> repositories) {
        if (repositories == null || repositories.isEmpty()) {
            return RepositoryStatsDto.builder()
                    .totalStars(0)
                    .totalForks(0)
                    .totalWatchers(0)
                    .totalOpenIssues(0)
                    .averageRepoSize(0L)
                    .mostUsedLanguage("N/A")
                    .largestRepository("N/A")
                    .largestRepositorySize(0L)
                    .totalRepositories(0)
                    .originalRepositories(0)
                    .forkedRepositories(0)
                    .archivedRepositories(0)
                    .build();
        }

        int totalStars = 0;
        int totalForks = 0;
        int totalWatchers = 0;
        int totalOpenIssues = 0;
        long totalSize = 0;
        int originalCount = 0;
        int forkedCount = 0;
        int archivedCount = 0;

        Map<String, Integer> languageFrequency = new HashMap<>();
        GitHubRepository largestRepo = null;

        for (GitHubRepository repo : repositories) {
            totalStars += repo.getStargazersCount() != null ? repo.getStargazersCount() : 0;
            totalForks += repo.getForksCount() != null ? repo.getForksCount() : 0;
            totalWatchers += repo.getWatchersCount() != null ? repo.getWatchersCount() : 0;
            totalOpenIssues += repo.getOpenIssuesCount() != null ? repo.getOpenIssuesCount() : 0;
            long size = repo.getSize() != null ? repo.getSize() : 0;
            totalSize += size;

            if (Boolean.TRUE.equals(repo.getFork())) {
                forkedCount++;
            } else {
                originalCount++;
            }

            if (Boolean.TRUE.equals(repo.getArchived())) {
                archivedCount++;
            }

            if (repo.getLanguage() != null) {
                languageFrequency.merge(repo.getLanguage(), 1, Integer::sum);
            }

            if (largestRepo == null || size > (largestRepo.getSize() != null ? largestRepo.getSize() : 0)) {
                largestRepo = repo;
            }
        }

        String mostUsedLanguage = languageFrequency.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("N/A");

        return RepositoryStatsDto.builder()
                .totalStars(totalStars)
                .totalForks(totalForks)
                .totalWatchers(totalWatchers)
                .totalOpenIssues(totalOpenIssues)
                .averageRepoSize(totalSize / repositories.size())
                .mostUsedLanguage(mostUsedLanguage)
                .largestRepository(largestRepo != null ? largestRepo.getName() : "N/A")
                .largestRepositorySize(largestRepo != null ? largestRepo.getSize() : 0L)
                .totalRepositories(repositories.size())
                .originalRepositories(originalCount)
                .forkedRepositories(forkedCount)
                .archivedRepositories(archivedCount)
                .build();
    }
}

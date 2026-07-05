package com.gitmind.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

/**
 * Main DTO that aggregates all GitHub analysis data.
 * This is the top-level response returned to the frontend.
 */
@Data
@Builder
public class GitHubAnalysisDto {

    private ProfileDto profile;
    private List<RepositoryDto> repositories;
    private List<LanguageStatsDto> languageStats;
    private RepositoryStatsDto repositoryStats;
    private List<EventDto> recentEvents;
}

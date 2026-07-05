package com.gitmind.dto;

import lombok.Builder;
import lombok.Data;

/**
 * DTO for aggregated repository statistics.
 */
@Data
@Builder
public class RepositoryStatsDto {

    private Integer totalStars;
    private Integer totalForks;
    private Integer totalWatchers;
    private Integer totalOpenIssues;
    private Long averageRepoSize;
    private String mostUsedLanguage;
    private String largestRepository;
    private Long largestRepositorySize;
    private Integer totalRepositories;
    private Integer originalRepositories;
    private Integer forkedRepositories;
    private Integer archivedRepositories;
}

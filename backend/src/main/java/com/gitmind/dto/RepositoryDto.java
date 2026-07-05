package com.gitmind.dto;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

/**
 * DTO for GitHub repository information.
 */
@Data
@Builder
public class RepositoryDto {

    private Long id;
    private String name;
    private String fullName;
    private String description;
    private String htmlUrl;
    private String language;
    private Integer forksCount;
    private Integer stargazersCount;
    private Integer watchersCount;
    private Integer openIssuesCount;
    private Long size;
    private Boolean fork;
    private Boolean archived;
    private Instant createdAt;
    private Instant updatedAt;
    private Instant pushedAt;
    private String defaultBranch;
    private String licenseName;
    private String ownerLogin;
}

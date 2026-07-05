package com.gitmind.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.Instant;

/**
 * Represents a GitHub repository.
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class GitHubRepository {

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
    private Boolean private_repo;
    private Instant createdAt;
    private Instant updatedAt;
    private Instant pushedAt;
    private String defaultBranch;
    private Integer forks;
    private Integer stars;
    private Integer openIssues;
    private License license;
    private Owner owner;

    @JsonProperty("full_name")
    public void setFullNameFromJson(String fullName) {
        this.fullName = fullName;
    }

    @JsonProperty("html_url")
    public void setHtmlUrlFromJson(String htmlUrl) {
        this.htmlUrl = htmlUrl;
    }

    @JsonProperty("forks_count")
    public void setForksCountFromJson(Integer forksCount) {
        this.forksCount = forksCount;
    }

    @JsonProperty("stargazers_count")
    public void setStargazersCountFromJson(Integer stargazersCount) {
        this.stargazersCount = stargazersCount;
    }

    @JsonProperty("watchers_count")
    public void setWatchersCountFromJson(Integer watchersCount) {
        this.watchersCount = watchersCount;
    }

    @JsonProperty("open_issues_count")
    public void setOpenIssuesCountFromJson(Integer openIssuesCount) {
        this.openIssuesCount = openIssuesCount;
    }

    @JsonProperty("created_at")
    public void setCreatedAtFromJson(Instant createdAt) {
        this.createdAt = createdAt;
    }

    @JsonProperty("updated_at")
    public void setUpdatedAtFromJson(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    @JsonProperty("pushed_at")
    public void setPushedAtFromJson(Instant pushedAt) {
        this.pushedAt = pushedAt;
    }

    @JsonProperty("default_branch")
    public void setDefaultBranchFromJson(String defaultBranch) {
        this.defaultBranch = defaultBranch;
    }

    @JsonProperty("private")
    public void setPrivateFromJson(Boolean private_repo) {
        this.private_repo = private_repo;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class License {
        private String key;
        private String name;
        private String spdxId;
        private String url;

        @JsonProperty("spdx_id")
        public void setSpdxIdFromJson(String spdxId) {
            this.spdxId = spdxId;
        }
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Owner {
        private String login;
        private Long id;
        private String avatarUrl;
        private String htmlUrl;
        private String type;

        @JsonProperty("avatar_url")
        public void setAvatarUrlFromJson(String avatarUrl) {
            this.avatarUrl = avatarUrl;
        }

        @JsonProperty("html_url")
        public void setHtmlUrlFromJson(String htmlUrl) {
            this.htmlUrl = htmlUrl;
        }
    }
}

package com.gitmind.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.Instant;

/**
 * Represents a GitHub user's profile information.
 * This model is prepared for future JPA persistence.
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class GitHubProfile {

    private Long id;
    private String login;
    private String name;
    private String bio;
    private String avatarUrl;
    private String htmlUrl;
    private String company;
    private String location;
    private String blog;
    private String twitterUsername;
    private String email;
    private Integer publicRepos;
    private Integer publicGists;
    private Integer followers;
    private Integer following;
    private Instant createdAt;
    private Instant updatedAt;
    private String type;

    @JsonProperty("avatar_url")
    public void setAvatarUrlFromJson(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    @JsonProperty("html_url")
    public void setHtmlUrlFromJson(String htmlUrl) {
        this.htmlUrl = htmlUrl;
    }

    @JsonProperty("twitter_username")
    public void setTwitterUsernameFromJson(String twitterUsername) {
        this.twitterUsername = twitterUsername;
    }

    @JsonProperty("public_repos")
    public void setPublicReposFromJson(Integer publicRepos) {
        this.publicRepos = publicRepos;
    }

    @JsonProperty("public_gists")
    public void setPublicGistsFromJson(Integer publicGists) {
        this.publicGists = publicGists;
    }

    @JsonProperty("created_at")
    public void setCreatedAtFromJson(Instant createdAt) {
        this.createdAt = createdAt;
    }

    @JsonProperty("updated_at")
    public void setUpdatedAtFromJson(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}

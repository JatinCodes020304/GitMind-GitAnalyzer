package com.gitmind.dto;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

/**
 * DTO for GitHub profile information.
 * This is the contract exposed to the frontend.
 */
@Data
@Builder
public class ProfileDto {

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
    private Integer publicRepos;
    private Integer publicGists;
    private Integer followers;
    private Integer following;
    private Instant createdAt;
    private Instant updatedAt;
}

package com.gitmind.exception;

import lombok.Getter;

import java.time.Instant;

/**
 * Exception thrown when GitHub API rate limit is exceeded.
 */
@Getter
public class GitHubRateLimitException extends RuntimeException {

    private final Instant resetTime;

    public GitHubRateLimitException(String message, Instant resetTime) {
        super(message);
        this.resetTime = resetTime;
    }
}

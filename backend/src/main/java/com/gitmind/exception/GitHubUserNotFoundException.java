package com.gitmind.exception;

/**
 * Exception thrown when a GitHub user is not found.
 */
public class GitHubUserNotFoundException extends RuntimeException {

    private final String username;

    public GitHubUserNotFoundException(String username) {
        super(String.format("GitHub user '%s' not found", username));
        this.username = username;
    }

    public String getUsername() {
        return username;
    }
}

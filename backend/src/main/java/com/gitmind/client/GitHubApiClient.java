package com.gitmind.client;

import com.gitmind.config.GitHubProperties;
import com.gitmind.exception.GitHubApiException;
import com.gitmind.exception.GitHubRateLimitException;
import com.gitmind.exception.GitHubUserNotFoundException;
import com.gitmind.model.GitHubEvent;
import com.gitmind.model.GitHubProfile;
import com.gitmind.model.GitHubRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.Collections;
import java.util.List;

/**
 * Client for interacting with the GitHub REST API.
 * Handles API calls with proper error handling and rate limit awareness.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class GitHubApiClient {

    private final RestTemplate restTemplate;
    private final GitHubProperties githubProperties;

    private static final String USERS_ENDPOINT = "/users/%s";
    private static final String REPOS_ENDPOINT = "/users/%s/repos?per_page=100&sort=updated";
    private static final String EVENTS_ENDPOINT = "/users/%s/events/public?per_page=30";

    /**
     * Fetches a GitHub user's profile information.
     *
     * @param username the GitHub username
     * @return the user's profile
     * @throws GitHubUserNotFoundException if user does not exist
     * @throws GitHubRateLimitException if rate limit is exceeded
     * @throws GitHubApiException for other API errors
     */
    public GitHubProfile fetchUserProfile(String username) {
        log.debug("Fetching profile for user: {}", username);
        String url = buildUrl(String.format(USERS_ENDPOINT, username));
        
        try {
            ResponseEntity<GitHubProfile> response = restTemplate.exchange(
                    url, HttpMethod.GET, createHttpEntity(), GitHubProfile.class);
            return response.getBody();
        } catch (HttpClientErrorException.NotFound ex) {
            throw new GitHubUserNotFoundException(username);
        } catch (HttpClientErrorException.Forbidden ex) {
            handleRateLimit(ex);
            throw new GitHubApiException("Access forbidden", HttpStatus.FORBIDDEN.value(), ex);
        } catch (HttpClientErrorException ex) {
            throw new GitHubApiException("GitHub API error: " + ex.getMessage(), 
                    ex.getStatusCode().value(), ex);
        }
    }

    /**
     * Fetches a GitHub user's repositories.
     *
     * @param username the GitHub username
     * @return list of repositories
     * @throws GitHubApiException for API errors
     */
    public List<GitHubRepository> fetchUserRepositories(String username) {
        log.debug("Fetching repositories for user: {}", username);
        String url = buildUrl(String.format(REPOS_ENDPOINT, username));
        
        try {
            ResponseEntity<List<GitHubRepository>> response = restTemplate.exchange(
                    url, HttpMethod.GET, createHttpEntity(), 
                    new ParameterizedTypeReference<>() {});
            return response.getBody() != null ? response.getBody() : Collections.emptyList();
        } catch (HttpClientErrorException.NotFound ex) {
            throw new GitHubUserNotFoundException(username);
        } catch (HttpClientErrorException.Forbidden ex) {
            handleRateLimit(ex);
            throw new GitHubApiException("Access forbidden", HttpStatus.FORBIDDEN.value(), ex);
        } catch (HttpClientErrorException ex) {
            throw new GitHubApiException("GitHub API error: " + ex.getMessage(), 
                    ex.getStatusCode().value(), ex);
        }
    }

    /**
     * Fetches a GitHub user's public events.
     *
     * @param username the GitHub username
     * @return list of public events
     * @throws GitHubApiException for API errors
     */
    public List<GitHubEvent> fetchUserEvents(String username) {
        log.debug("Fetching events for user: {}", username);
        String url = buildUrl(String.format(EVENTS_ENDPOINT, username));
        
        try {
            ResponseEntity<List<GitHubEvent>> response = restTemplate.exchange(
                    url, HttpMethod.GET, createHttpEntity(), 
                    new ParameterizedTypeReference<>() {});
            return response.getBody() != null ? response.getBody() : Collections.emptyList();
        } catch (HttpClientErrorException.NotFound ex) {
            throw new GitHubUserNotFoundException(username);
        } catch (HttpClientErrorException.Forbidden ex) {
            handleRateLimit(ex);
            throw new GitHubApiException("Access forbidden", HttpStatus.FORBIDDEN.value(), ex);
        } catch (HttpClientErrorException ex) {
            throw new GitHubApiException("GitHub API error: " + ex.getMessage(), 
                    ex.getStatusCode().value(), ex);
        }
    }

    private String buildUrl(String endpoint) {
        return githubProperties.getBaseUrl() + endpoint;
    }

    private HttpEntity<Void> createHttpEntity() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("User-Agent", githubProperties.getUserAgent());
        headers.set("Accept", "application/vnd.github.v3+json");
        return new HttpEntity<>(headers);
    }

    private void handleRateLimit(HttpClientErrorException.Forbidden ex) {
        String resetHeader = ex.getResponseHeaders() != null 
                ? ex.getResponseHeaders().getFirst("X-RateLimit-Reset") 
                : null;
        Instant resetTime = resetHeader != null 
                ? Instant.ofEpochSecond(Long.parseLong(resetHeader)) 
                : Instant.now().plusSeconds(3600);
        throw new GitHubRateLimitException(
                "GitHub API rate limit exceeded. Please try again later.", resetTime);
    }
}

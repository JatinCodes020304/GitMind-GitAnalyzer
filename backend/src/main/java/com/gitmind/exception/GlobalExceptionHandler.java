package com.gitmind.exception;

import com.gitmind.dto.ApiErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;

import java.time.Instant;

/**
 * Global exception handler for the application.
 * Provides consistent error responses across all API endpoints.
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(GitHubUserNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleUserNotFound(
            GitHubUserNotFoundException ex, HttpServletRequest request) {
        log.warn("GitHub user not found: {}", ex.getUsername());
        return buildErrorResponse(HttpStatus.NOT_FOUND, ex.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler(GitHubRateLimitException.class)
    public ResponseEntity<ApiErrorResponse> handleRateLimit(
            GitHubRateLimitException ex, HttpServletRequest request) {
        log.warn("GitHub API rate limit exceeded. Resets at: {}", ex.getResetTime());
        return buildErrorResponse(HttpStatus.TOO_MANY_REQUESTS, ex.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler(GitHubApiException.class)
    public ResponseEntity<ApiErrorResponse> handleGitHubApiError(
            GitHubApiException ex, HttpServletRequest request) {
        log.error("GitHub API error: status={}, message={}", ex.getStatusCode(), ex.getMessage());
        HttpStatus status = HttpStatus.resolve(ex.getStatusCode()) != null 
            ? HttpStatus.valueOf(ex.getStatusCode()) 
            : HttpStatus.BAD_GATEWAY;
        return buildErrorResponse(status, ex.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler(HttpClientErrorException.NotFound.class)
    public ResponseEntity<ApiErrorResponse> handleNotFound(
            HttpClientErrorException.NotFound ex, HttpServletRequest request) {
        log.warn("Resource not found: {}", request.getRequestURI());
        return buildErrorResponse(HttpStatus.NOT_FOUND, "Resource not found", request.getRequestURI());
    }

    @ExceptionHandler(HttpClientErrorException.Forbidden.class)
    public ResponseEntity<ApiErrorResponse> handleForbidden(
            HttpClientErrorException.Forbidden ex, HttpServletRequest request) {
        log.warn("GitHub API forbidden - possible rate limit");
        return buildErrorResponse(HttpStatus.TOO_MANY_REQUESTS, 
            "API rate limit exceeded or access forbidden. Please try again later.", 
            request.getRequestURI());
    }

    @ExceptionHandler(ResourceAccessException.class)
    public ResponseEntity<ApiErrorResponse> handleResourceAccess(
            ResourceAccessException ex, HttpServletRequest request) {
        log.error("Network error accessing GitHub API: {}", ex.getMessage());
        return buildErrorResponse(HttpStatus.SERVICE_UNAVAILABLE, 
            "Unable to reach GitHub API. Please try again later.", 
            request.getRequestURI());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleGeneric(
            Exception ex, HttpServletRequest request) {
        log.error("Unexpected error: {}", ex.getMessage(), ex);
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, 
            "An unexpected error occurred. Please try again later.", 
            request.getRequestURI());
    }

    private ResponseEntity<ApiErrorResponse> buildErrorResponse(
            HttpStatus status, String message, String path) {
        ApiErrorResponse error = ApiErrorResponse.builder()
                .timestamp(Instant.now())
                .status(status.value())
                .error(status.getReasonPhrase())
                .message(message)
                .path(path)
                .build();
        return ResponseEntity.status(status).body(error);
    }
}

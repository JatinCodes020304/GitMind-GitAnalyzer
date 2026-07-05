package com.gitmind.dto;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

/**
 * Standard error response DTO for API errors.
 */
@Data
@Builder
public class ApiErrorResponse {

    private Instant timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
}

package com.gitmind.dto;

import lombok.Builder;
import lombok.Data;

/**
 * DTO for programming language statistics.
 */
@Data
@Builder
public class LanguageStatsDto {

    private String language;
    private Integer repositoryCount;
    private Long totalSize;
    private Double percentage;
}

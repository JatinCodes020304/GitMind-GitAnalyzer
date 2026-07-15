package com.gitmind.dto;

import lombok.Builder;
import lombok.Data;

/**
 * A single day in the contribution calendar.
 */
@Data
@Builder
public class ContributionDayDto {

    /** ISO date, e.g. "2026-07-14" */
    private String date;

    /** Number of contributions on this day */
    private int count;

    /** Intensity bucket 0-4 (0 = none, 4 = highest), mirrors GitHub's own heatmap shading */
    private int level;
}

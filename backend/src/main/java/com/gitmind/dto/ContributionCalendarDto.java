package com.gitmind.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

/**
 * Full contribution calendar for a user, covering the trailing 12 months
 * (matching what GitHub itself shows on a profile page), plus derived
 * streak statistics.
 */
@Data
@Builder
public class ContributionCalendarDto {

    private int totalContributions;
    private int currentStreak;
    private int longestStreak;
    private String busiestDay;
    private int busiestDayCount;

    /** Flat, chronologically-ordered list of every day in the window */
    private List<ContributionDayDto> days;
}

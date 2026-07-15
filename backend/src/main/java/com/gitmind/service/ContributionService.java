package com.gitmind.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.gitmind.client.GitHubGraphQLClient;
import com.gitmind.dto.ContributionCalendarDto;
import com.gitmind.dto.ContributionDayDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;

/**
 * Builds the contribution heatmap (like the one on a user's GitHub profile
 * page) from raw GraphQL data, including derived streak statistics.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ContributionService {

    private final GitHubGraphQLClient graphQLClient;

    public ContributionCalendarDto getContributionCalendar(String username) {
        log.info("Fetching contribution calendar for user: {}", username);

        JsonNode calendarNode = graphQLClient.fetchContributionCalendar(username);
        int total = calendarNode.path("totalContributions").asInt(0);

        List<ContributionDayDto> rawDays = new ArrayList<>();
        JsonNode weeks = calendarNode.path("weeks");
        for (JsonNode week : weeks) {
            for (JsonNode day : week.path("contributionDays")) {
                int count = day.path("contributionCount").asInt(0);
                rawDays.add(ContributionDayDto.builder()
                        .date(day.path("date").asText())
                        .count(count)
                        .level(bucketize(count))
                        .build());
            }
        }

        rawDays.sort(Comparator.comparing(ContributionDayDto::getDate));

        int[] streaks = computeStreaks(rawDays);
        String busiestDay = "N/A";
        int busiestCount = 0;
        for (ContributionDayDto d : rawDays) {
            if (d.getCount() > busiestCount) {
                busiestCount = d.getCount();
                busiestDay = d.getDate();
            }
        }

        return ContributionCalendarDto.builder()
                .totalContributions(total)
                .currentStreak(streaks[0])
                .longestStreak(streaks[1])
                .busiestDay(busiestDay)
                .busiestDayCount(busiestCount)
                .days(rawDays)
                .build();
    }

    /**
     * Buckets a raw contribution count into a 0-4 intensity level,
     * matching the visual scale GitHub itself uses.
     */
    private int bucketize(int count) {
        if (count <= 0) return 0;
        if (count <= 3) return 1;
        if (count <= 6) return 2;
        if (count <= 9) return 3;
        return 4;
    }

    /**
     * Computes current streak (consecutive days with >=1 contribution,
     * counting back from today or the most recent contributing day) and
     * the longest streak in the whole window.
     *
     * @return [currentStreak, longestStreak]
     */
    private int[] computeStreaks(List<ContributionDayDto> days) {
        int longest = 0;
        int running = 0;
        for (ContributionDayDto d : days) {
            if (d.getCount() > 0) {
                running++;
                longest = Math.max(longest, running);
            } else {
                running = 0;
            }
        }

        // Current streak: walk backwards from the last day. If today has
        // zero contributions yet (common - day isn't over), allow skipping
        // just the most recent day so an active streak isn't shown as broken.
        int current = 0;
        Iterator<ContributionDayDto> it = reversed(days);
        boolean first = true;
        while (it.hasNext()) {
            ContributionDayDto d = it.next();
            if (d.getCount() > 0) {
                current++;
            } else if (first) {
                // today/most recent day has no contributions yet - skip, don't break streak
            } else {
                break;
            }
            first = false;
        }

        return new int[]{current, longest};
    }

    private Iterator<ContributionDayDto> reversed(List<ContributionDayDto> days) {
        List<ContributionDayDto> copy = new ArrayList<>(days);
        java.util.Collections.reverse(copy);
        return copy.iterator();
    }
}

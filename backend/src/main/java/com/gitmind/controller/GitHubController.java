    package com.gitmind.controller;

    import com.gitmind.dto.ContributionCalendarDto;
    import com.gitmind.dto.GitHubAnalysisDto;
    import com.gitmind.service.ContributionService;
    import com.gitmind.service.GitHubAnalysisService;
    import lombok.RequiredArgsConstructor;
    import lombok.extern.slf4j.Slf4j;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    /**
     * REST Controller for GitHub profile analysis endpoints.
     * Provides a single endpoint to analyze a GitHub user's profile comprehensively.
     */
    @Slf4j
    @RestController
    @RequestMapping("/api/github")
    @RequiredArgsConstructor
    @CrossOrigin(origins = "*")
    public class GitHubController {

        private final GitHubAnalysisService analysisService;
        private final ContributionService contributionService;

        /**
         * Analyzes a GitHub user's profile and returns comprehensive data.
         *
         * @param username the GitHub username to analyze
         * @return comprehensive analysis including profile, repos, stats, and events
         */
        @GetMapping("/{username}")
        public ResponseEntity<GitHubAnalysisDto> analyzeUser(@PathVariable String username) {
            log.info("Received analysis request for user: {}", username);
            
            // Validate username format
            if (!isValidUsername(username)) {
                log.warn("Invalid username format: {}", username);
                return ResponseEntity.badRequest().build();
            }
            
            GitHubAnalysisDto result = analysisService.analyzeUser(username);
            return ResponseEntity.ok(result);
        }

        /**
         * Returns the user's contribution calendar (the commit heatmap),
         * covering the trailing 12 months, plus current/longest streak stats.
         *
         * @param username the GitHub username to fetch contributions for
         * @return contribution calendar with daily counts and streaks
         */
        @GetMapping("/{username}/contributions")
        public ResponseEntity<ContributionCalendarDto> getContributions(@PathVariable String username) {
            log.info("Received contribution calendar request for user: {}", username);

            if (!isValidUsername(username)) {
                log.warn("Invalid username format: {}", username);
                return ResponseEntity.badRequest().build();
            }

            ContributionCalendarDto result = contributionService.getContributionCalendar(username);
            return ResponseEntity.ok(result);
        }

        /**
         * Validates GitHub username format.
         * GitHub usernames can contain alphanumeric characters and hyphens,
         * cannot start or end with a hyphen, and max length is 39 characters.
         */
        private boolean isValidUsername(String username) {
            return username != null 
                    && !username.isBlank() 
                    && username.matches("^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$");
        }
    }

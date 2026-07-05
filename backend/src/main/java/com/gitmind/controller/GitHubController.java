    package com.gitmind.controller;

    import com.gitmind.dto.GitHubAnalysisDto;
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

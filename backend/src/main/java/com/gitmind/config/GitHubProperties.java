package com.gitmind.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration properties for GitHub API integration.
 */
@Configuration
@ConfigurationProperties(prefix = "github.api")
@Getter
@Setter
public class GitHubProperties {

    private String baseUrl = "https://api.github.com";
    private String graphqlUrl = "https://api.github.com/graphql";
    private String userAgent = "GitMind-AI/1.0";
    private long connectTimeout = 10000;
    private long readTimeout = 30000;
    /**
     * Personal access token used for GitHub API auth.
     * Required for GraphQL calls (contribution calendar) and strongly
     * recommended for REST calls to avoid the 60 req/hr unauthenticated limit.
     */
    private String token = "";
}

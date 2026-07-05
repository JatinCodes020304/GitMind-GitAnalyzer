package com.gitmind.config;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

/**
 * Application configuration for HTTP clients and common beans.
 */
@Configuration
public class AppConfig {

    /**
     * Configures RestTemplate for GitHub API communication.
     */
    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder, 
                                      GitHubProperties githubProperties) {
        return builder
                .setConnectTimeout(Duration.ofMillis(githubProperties.getConnectTimeout()))
                .setReadTimeout(Duration.ofMillis(githubProperties.getReadTimeout()))
                .build();
    }
}

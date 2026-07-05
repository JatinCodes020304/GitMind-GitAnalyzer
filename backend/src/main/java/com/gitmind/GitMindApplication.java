package com.gitmind;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;

/**
 * GitMind AI - GitHub Profile Analyzer Application.
 * 
 * This is the entry point for the Spring Boot application.
 * Database auto-configuration is excluded since this phase does not persist data.
 * Data will be persisted in future phases when AI features are integrated.
 */
@SpringBootApplication
public class GitMindApplication {

    public static void main(String[] args) {
        SpringApplication.run(GitMindApplication.class, args);
    }
}

package com.gitmind.service;

import com.gitmind.model.AiAnalysis;
import com.gitmind.repository.AiAnalysisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AiAnalysisService {

    private final GeminiClient geminiClient;
    private final AiAnalysisRepository repository;

    public String getDeveloperSummary(String username, String githubDataJson) {
        return repository.findByUsernameAndAnalysisType(username, "summary")
                .map(AiAnalysis::getResultJson)
                .orElseGet(() -> {
                    log.info("No cached summary for {}, generating new one", username);
                    String prompt = buildSummaryPrompt(githubDataJson);
                    String result = geminiClient.generate(prompt);
                    repository.save(new AiAnalysis(username, "summary", result));
                    return result;
                });
    }

    private String buildSummaryPrompt(String githubDataJson) {
        return """
            You are a senior technical career coach analyzing a developer's GitHub profile.

            Here is the developer's data (JSON):
            %s

            Write a 3-4 sentence professional summary describing:
            1. Their primary specialization
            2. Their strongest technical skills
            3. One clear area to improve for job-readiness

            Respond ONLY with valid JSON, no markdown, no extra text:
            { "summary": "..." }
            """.formatted(githubDataJson);
    }
}

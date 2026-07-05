package com.gitmind.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Slf4j
@Service
public class GeminiClient {

    private final WebClient webClient;
    private final String apiKey;
    private final ObjectMapper mapper = new ObjectMapper();

    public GeminiClient(@Value("${gemini.api.url}") String apiUrl,
                         @Value("${gemini.api.key}") String apiKey) {
        this.apiKey = apiKey;
        this.webClient = WebClient.builder().baseUrl(apiUrl).build();
    }

    public String generate(String prompt) {
        String requestBody = """
            {
              "contents": [{
                "parts": [{"text": %s}]
              }]
            }
            """.formatted(mapper.valueToTree(prompt).toString());

        log.info("Calling Gemini API");

        JsonNode response = webClient.post()
                .uri(uriBuilder -> uriBuilder.queryParam("key", apiKey).build())
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(JsonNode.class)
                .block();

        return response
                .path("candidates").get(0)
                .path("content").path("parts").get(0)
                .path("text").asText();
    }
}

package com.gitmind.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "ai_analysis")
@Getter
@Setter
@NoArgsConstructor
public class AiAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String analysisType; // "summary", "skills", "roadmap", etc.

    @Column(columnDefinition = "TEXT")
    private String resultJson;

    private LocalDateTime createdAt;

    public AiAnalysis(String username, String analysisType, String resultJson) {
        this.username = username;
        this.analysisType = analysisType;
        this.resultJson = resultJson;
        this.createdAt = LocalDateTime.now();
    }
}

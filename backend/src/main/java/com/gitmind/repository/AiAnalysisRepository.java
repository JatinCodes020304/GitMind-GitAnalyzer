package com.gitmind.repository;

import com.gitmind.model.AiAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AiAnalysisRepository extends JpaRepository<AiAnalysis, Long> {
    Optional<AiAnalysis> findByUsernameAndAnalysisType(String username, String analysisType);
}

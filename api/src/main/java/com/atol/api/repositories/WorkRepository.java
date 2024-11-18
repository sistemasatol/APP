package com.atol.api.repositories;

import com.atol.api.models.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkRepository extends JpaRepository<Work, Long> {
    // Métodos personalizados para Work, se necessário
}

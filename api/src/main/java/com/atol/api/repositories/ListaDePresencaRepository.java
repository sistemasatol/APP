package com.atol.api.repositories;

import com.atol.api.models.ListaDePresenca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListaDePresencaRepository extends JpaRepository<ListaDePresenca, Long> {
}

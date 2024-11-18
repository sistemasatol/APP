package com.atol.api.repositories;

import com.atol.api.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    // Métodos personalizados para Role, se necessário
}

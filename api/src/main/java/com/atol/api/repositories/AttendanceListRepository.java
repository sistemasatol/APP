package com.atol.api.repositories;

import com.atol.api.models.AttendanceList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendanceListRepository extends JpaRepository<AttendanceList, Long> {
}

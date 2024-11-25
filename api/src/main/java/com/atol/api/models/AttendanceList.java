package com.atol.api.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "attendance_lists")
@Data
public class AttendanceList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String responsible;

    private String data;

    private Integer employeesNumber;

    @ManyToOne
    @JoinColumn(name = "work_id", nullable = false)
    private Work work;

    private List<String> employees;
}

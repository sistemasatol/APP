package com.atol.api.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "works")
public class Work {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
}

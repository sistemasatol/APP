package com.atol.api.models;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "enterprises")
public class Enterprise {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cnpj, name, phoneNumber;

    public Enterprise() {
    }
}

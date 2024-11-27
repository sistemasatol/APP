package com.atol.api.models;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "tb_anexos")
@Getter
@Setter
public class Anexo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String caminho; // Caminho do arquivo

    private String tipo; // Tipo do arquivo (ex: pdf, imagem, etc.)

    @Column(name = "criado_em")
    private LocalDateTime criadoEm = LocalDateTime.now();
}
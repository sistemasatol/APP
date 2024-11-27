package com.atol.api.models;

import jakarta.persistence.*;
import lombok.Data;


import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "tb_listaDePresenca")
public class ListaDePresenca {
    public ListaDePresenca(){}
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String responsavel;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm = LocalDateTime.now();

    private Integer qtdFuncionarios;


    @ManyToOne
    @JoinColumn(name = "obra_id", nullable = false)
    private Obra obra;

    @ManyToOne
    @JoinColumn(name = "anexo_id")
    private Anexo anexo;

    private List<String> funcionarios;
}

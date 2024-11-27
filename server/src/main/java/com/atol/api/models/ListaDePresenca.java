package com.atol.api.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.jdbc.Work;

import java.util.List;

@Entity
@Data
@Table(name = "tb_listaDePresenca")
public class ListaDePresenca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String responsavel;

    private String dataLista;

    private Integer qtdFuncionarios;

    @ManyToOne
    @JoinColumn(name = "obra_id", nullable = false)
    private Obra obra;

    private List<String> funcionarios;
}

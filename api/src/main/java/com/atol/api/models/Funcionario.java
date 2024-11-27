package com.atol.api.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@Entity
@Table(name = "tb_funcionarios")
public class Funcionario {
    public Funcionario() {
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome, sobrenome,  telefone, nascimento;

    @Column(unique = true)
    private String cpf;

    @ManyToOne
    @JoinColumn(name = "empresa_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Empresa empresa;

    @ManyToOne
    @JoinColumn(name = "cargo_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Cargo cargo;


    @ManyToOne
    @JoinColumn(name = "obra_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Obra obra;

    @ManyToOne
    @JoinColumn(name = "anexo_id")
    private Anexo anexo;
}

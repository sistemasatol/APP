package com.atol.api.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Employee() {
    }

    private String name, lastName,  phoneNumber, birthDate;

    @Column(unique = true)
    private String cpf;

    @ManyToOne
    @JoinColumn(name = "enterprise_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Enterprise enterprise;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Role role;

    @ManyToOne
    @JoinColumn(name = "work_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Work work;
}

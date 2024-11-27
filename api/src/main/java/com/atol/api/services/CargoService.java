package com.atol.api.services;

import com.atol.api.models.Cargo;
import com.atol.api.repositories.CargoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CargoService {

    @Autowired
    private CargoRepository cargoRepository;

    public List<Cargo> buscarTodosCargos() {
        return cargoRepository.findAll(); // Retorna a lista de todos os cargos
    }

    public Optional<Cargo> buscarCargoPorId(Long id) {
        return cargoRepository.findById(id); // Busca um cargo específico pelo ID
    }

    public Cargo criarCargo(Cargo cargo) {
        return cargoRepository.save(cargo); // Cria e salva um novo cargo
    }

    public Cargo atualizarCargo(Long id, Cargo cargo) {
        cargo.setId(id); // Define o ID para garantir atualização
        return cargoRepository.save(cargo); // Atualiza os dados do cargo
    }

    public void deletarCargo(Long id) {
        cargoRepository.deleteById(id); // Remove o cargo pelo ID
    }
}

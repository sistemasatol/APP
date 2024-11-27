package com.atol.api.controllers;

import com.atol.api.models.Cargo;
import com.atol.api.services.CargoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cargos")
public class CargoController {

    @Autowired
    private CargoService cargoService;

    @GetMapping
    public ResponseEntity<List<Cargo>> buscarTodosCargos() {
        List<Cargo> cargos = cargoService.buscarTodosCargos();
        return ResponseEntity.ok(cargos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cargo> buscarCargoPorId(@PathVariable Long id) {
        Optional<Cargo> cargo = cargoService.buscarCargoPorId(id);
        return cargo.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Cargo> criarCargo(@RequestBody Cargo cargo) {
        Cargo novoCargo = cargoService.criarCargo(cargo);
        return ResponseEntity.ok(novoCargo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cargo> atualizarCargo(@PathVariable Long id, @RequestBody Cargo cargo) {
        Cargo cargoAtualizado = cargoService.atualizarCargo(id, cargo);
        return ResponseEntity.ok(cargoAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarCargo(@PathVariable Long id) {
        cargoService.deletarCargo(id);
        return ResponseEntity.noContent().build();
    }
}

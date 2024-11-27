package com.atol.api.controllers;

import com.atol.api.models.Obra;
import com.atol.api.services.ObraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/obras")
public class ObraController {

    @Autowired
    private ObraService obraService;

    @GetMapping
    public ResponseEntity<List<Obra>> buscarTodasObras() {
        List<Obra> obras = obraService.buscarTodasObras();
        return ResponseEntity.ok(obras);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Obra> buscarObraPorId(@PathVariable Long id) {
        Optional<Obra> obra = obraService.buscarObraPorId(id);
        return obra.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Obra> criarObra(@RequestBody Obra obra) {
        Obra novaObra = obraService.criarObra(obra);
        return ResponseEntity.ok(novaObra);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Obra> atualizarObra(@PathVariable Long id, @RequestBody Obra obra) {
        Obra obraAtualizada = obraService.atualizarObra(id, obra);
        return ResponseEntity.ok(obraAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarObra(@PathVariable Long id) {
        obraService.deletarObra(id);
        return ResponseEntity.noContent().build();
    }
}

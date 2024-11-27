package com.atol.api.controllers;

import com.atol.api.models.ListaDePresenca;
import com.atol.api.services.ListaDePresencaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/listas-de-presenca")
public class ListaDePresencaController {

    @Autowired
    private ListaDePresencaService listaDePresencaService;

    @GetMapping
    public ResponseEntity<List<ListaDePresenca>> buscarTodasListasDePresenca() {
        List<ListaDePresenca> listas = listaDePresencaService.buscarTodasListasDePresencas();
        return ResponseEntity.ok(listas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListaDePresenca> buscarListaDePresencaPorId(@PathVariable Long id) {
        Optional<ListaDePresenca> lista = listaDePresencaService.buscarListaDePresencaPorId(id);
        return lista.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ListaDePresenca> criarListaDePresenca(@RequestBody ListaDePresenca listaDePresenca) {
        ListaDePresenca novaLista = listaDePresencaService.criarListaDePresenca(listaDePresenca);
        return ResponseEntity.ok(novaLista);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ListaDePresenca> atualizarListaDePresenca(@PathVariable Long id, @RequestBody ListaDePresenca listaDePresenca) {
        ListaDePresenca listaAtualizada = listaDePresencaService.atualizarListaDePresenca(id, listaDePresenca);
        return ResponseEntity.ok(listaAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarListaDePresenca(@PathVariable Long id) {
        listaDePresencaService.deletarListaDePresenca(id);
        return ResponseEntity.noContent().build();
    }
}

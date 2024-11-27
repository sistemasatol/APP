package com.atol.api.controllers;

import com.atol.api.models.Anexo;
import com.atol.api.services.AnexoService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/anexos")
public class AnexoController {

    private final AnexoService anexoService;

    public AnexoController(AnexoService anexoService) {
        this.anexoService = anexoService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadArquivo(@RequestParam("arquivo") MultipartFile arquivo) {
        try {
            Anexo anexo = anexoService.salvarArquivo(arquivo);
            return ResponseEntity.ok(anexo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao fazer upload do arquivo.");
        }
    }

    @GetMapping("/download/{nomeArquivo}")
    public ResponseEntity<?> downloadArquivo(@PathVariable String nome) {
        try {
            byte[] arquivo = anexoService.buscarArquivo(nome);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + nome)
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(arquivo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Arquivo não encontrado.");
        }
    }
}

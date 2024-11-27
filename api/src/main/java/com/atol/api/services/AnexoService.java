package com.atol.api.services;

import com.atol.api.models.Anexo;
import com.atol.api.repositories.AnexoRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class AnexoService {

    @Value("${diretorio.upload}")
    private String diretorioUpload;

    private final AnexoRepository anexoRepository;

    public AnexoService(AnexoRepository anexoRepository) {
        this.anexoRepository = anexoRepository;
    }

    public Anexo salvarArquivo(MultipartFile arquivo) throws IOException {
        // Salvar o arquivo no diretório
        Path caminho = Paths.get(diretorioUpload, arquivo.getOriginalFilename());
        Files.copy(arquivo.getInputStream(), caminho);

        // Salvar informações no banco
        Anexo anexo = new Anexo();
        anexo.setNome(arquivo.getOriginalFilename());
        anexo.setTipo(arquivo.getContentType());
        anexo.setCaminho(caminho.toString());

        return anexoRepository.save(anexo);
    }

    public byte[] buscarArquivo(String nomeArquivo) throws IOException {
        Path caminho = Paths.get(diretorioUpload, nomeArquivo);
        return Files.readAllBytes(caminho);
    }
}

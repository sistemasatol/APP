package com.atol.api.services;

import com.atol.api.models.Anexo;
import com.atol.api.models.ListaDePresenca;
import com.atol.api.repositories.AnexoRepository;
import com.atol.api.repositories.ListaDePresencaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

@Service
public class ListaDePresencaService {

    @Autowired
    private ListaDePresencaRepository listaDePresencaRepository;
    @Autowired
    private AnexoRepository anexoRepository;

    @Value("${diretorio.upload}")
    private String diretorioUpload;

    public List<ListaDePresenca> buscarTodasListasDePresencas() {
        return listaDePresencaRepository.findAll();
    }

    public Optional<ListaDePresenca> buscarListaDePresencaPorId(Long id) {
        return listaDePresencaRepository.findById(id);
    }

    public ListaDePresenca criarListaDePresenca(ListaDePresenca listaDePresenca, MultipartFile arquivo) throws IOException {
        // Salvar o arquivo no diretório
        Path caminho = Paths.get(diretorioUpload, arquivo.getOriginalFilename());
        Files.copy(arquivo.getInputStream(), caminho, StandardCopyOption.REPLACE_EXISTING);

        // Salvar informações no banco
        Anexo anexo = new Anexo();
        anexo.setNome(arquivo.getOriginalFilename());
        anexo.setTipo(arquivo.getContentType());
        anexo.setCaminho(caminho.toString());
        anexoRepository.save(anexo);

        listaDePresenca.setAnexo(anexo);
        return listaDePresencaRepository.save(listaDePresenca);
    }

    public ListaDePresenca atualizarListaDePresenca(Long id, ListaDePresenca listaDePresenca) {
        listaDePresenca.setId(id);
        return listaDePresencaRepository.save(listaDePresenca);
    }

    public void deletarListaDePresenca(Long id) {
        listaDePresencaRepository.deleteById(id);
    }


}

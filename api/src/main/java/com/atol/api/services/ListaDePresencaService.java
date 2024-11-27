package com.atol.api.services;

import com.atol.api.models.ListaDePresenca;
import com.atol.api.repositories.ListaDePresencaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ListaDePresencaService {

    @Autowired
    private ListaDePresencaRepository listaDePresencaRepository;

    public List<ListaDePresenca> buscarTodasListasDePresencas() {
        return listaDePresencaRepository.findAll();
    }

    public Optional<ListaDePresenca> buscarListaDePresencaPorId(Long id) {
        return listaDePresencaRepository.findById(id);
    }

    public ListaDePresenca criarListaDePresenca(ListaDePresenca listaDePresenca) {
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

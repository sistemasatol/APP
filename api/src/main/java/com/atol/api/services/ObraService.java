package com.atol.api.services;

import com.atol.api.models.Obra;
import com.atol.api.repositories.ObraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ObraService {

    @Autowired
    private ObraRepository obraRepository;

    public List<Obra> buscarTodasObras() {
        return obraRepository.findAll(); // Retorna a lista de todas as obras
    }

    public Optional<Obra> buscarObraPorId(Long id) {
        return obraRepository.findById(id); // Busca uma obra específica pelo ID
    }

    public Obra criarObra(Obra obra) {
        return obraRepository.save(obra); // Cria e salva uma nova obra
    }

    public Obra atualizarObra(Long id, Obra obra) {
        obra.setId(id); // Define o ID para garantir atualização
        return obraRepository.save(obra); // Atualiza os dados da obra
    }

    public void deletarObra(Long id) {
        obraRepository.deleteById(id); // Remove a obra pelo ID
    }
}

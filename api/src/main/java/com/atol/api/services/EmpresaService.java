package com.atol.api.services;

import com.atol.api.models.Empresa;
import com.atol.api.repositories.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    public List<Empresa> buscarTodasEmpresas() {
        return empresaRepository.findAll();
    }

    public Optional<Empresa> buscarEmpresaPorId(Long id) {
        return empresaRepository.findById(id);
    }

    public Empresa criarEmpresa(Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    public Empresa atualizarEmpresa(Long id, Empresa empresa) {
        empresa.setId(id);
        return empresaRepository.save(empresa);
    }

    public void deletarEmpresa(Long id) {
        empresaRepository.deleteById(id);
    }
}


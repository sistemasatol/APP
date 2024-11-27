package com.atol.api.services;

import com.atol.api.models.Funcionario;
import com.atol.api.repositories.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;


    public List<Funcionario> buscarTodosFuncionarios() {
        return funcionarioRepository.findAll();
    }

    public Optional<Funcionario> buscarFuncionarioPorID(Long id) {
        return funcionarioRepository.findById(id);
    }
    public Funcionario criarFuncionario(Funcionario funcionario){
        return funcionarioRepository.save(funcionario);
    }
    public Funcionario atualizarFuncionario(Long id, Funcionario funcionario) {
        funcionario.setId(id);
        return funcionarioRepository.save(funcionario);
    }
    public void deletarFuncionario(Long id) {
        funcionarioRepository.deleteById(id);
    }
    public List<Funcionario> buscarFuncionarioPeloObraID(Long obra_id) {
        return funcionarioRepository.buscarPeloObraId(obra_id);
    }

}

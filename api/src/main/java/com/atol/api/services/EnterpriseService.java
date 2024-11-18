package com.atol.api.services;

import com.atol.api.models.Enterprise;
import com.atol.api.repositories.EnterpriseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnterpriseService {

    @Autowired
    private EnterpriseRepository enterpriseRepository;

    public List<Enterprise> getAllEnterprises() {
        return enterpriseRepository.findAll();
    }

    public Optional<Enterprise> getEnterpriseById(Long id) {
        return enterpriseRepository.findById(id);
    }

    public Enterprise createEnterprise(Enterprise enterprise) {
        return enterpriseRepository.save(enterprise);
    }

    public Enterprise updateEnterprise(Long id, Enterprise enterprise) {
        enterprise.setId(id);
        return enterpriseRepository.save(enterprise);
    }

    public void deleteEnterprise(Long id) {
        enterpriseRepository.deleteById(id);
    }
}

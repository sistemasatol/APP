package com.atol.api.services;

import com.atol.api.models.Work;
import com.atol.api.repositories.WorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkService {

    @Autowired
    private WorkRepository workRepository;

    public List<Work> getAllWorks() {
        return workRepository.findAll();
    }

    public Optional<Work> getWorkById(Long id) {
        return workRepository.findById(id);
    }

    public Work createWork(Work work) {
        return workRepository.save(work);
    }

    public Work updateWork(Long id, Work work) {
        work.setId(id);
        return workRepository.save(work);
    }

    public void deleteWork(Long id) {
        workRepository.deleteById(id);
    }
}

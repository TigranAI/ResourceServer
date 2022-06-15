package ru.tigran.resourceserver.database.redis.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.tigran.resourceserver.database.redis.entity.Solution;
import ru.tigran.resourceserver.database.redis.repository.SolutionRepository;
import ru.tigran.resourceserver.utils.IteratorUtil;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SolutionService {
    @Autowired
    SolutionRepository repository;

    public List<Integer> findSolvedProblems() {
        return IteratorUtil.streamOf(repository.findAll())
                .map(Solution::getTaskId)
                .distinct()
                .collect(Collectors.toList());
    }

    public Optional<Solution> findById(String id) {
        return repository.findById(id);
    }
}

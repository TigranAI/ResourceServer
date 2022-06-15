package ru.tigran.resourceserver.database.redis.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.tigran.resourceserver.database.redis.entity.Solution;

@Repository
public interface SolutionRepository extends CrudRepository<Solution, String> {
}

package ru.tigran.resourceserver.database.postgres.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.tigran.resourceserver.database.postgres.entity.Problem;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Integer> {

}

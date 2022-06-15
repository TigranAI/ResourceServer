package ru.tigran.resourceserver.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.tigran.resourceserver.database.postgres.entity.Problem;
import ru.tigran.resourceserver.database.postgres.repository.ProblemRepository;
import ru.tigran.resourceserver.database.redis.entity.Solution;
import ru.tigran.resourceserver.database.redis.repository.SolutionRepository;
import ru.tigran.resourceserver.utils.IteratorUtil;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/status")
public class StatusController {
    @Autowired
    SolutionRepository solutionRepository;
    @Autowired
    ProblemRepository problemRepository;

    @GetMapping
    public String showStatus(Model model) {
        Iterable<Solution> solutions = solutionRepository.findAll();
        model.addAttribute("solutions", IteratorUtil.listOf(solutions));
        List<Problem> problems  = problemRepository.findAll();
        Map<Integer, String> taskNames = problems.stream().collect(Collectors.toMap(Problem::getId, Problem::getTitle));
        model.addAttribute("taskNames", taskNames);
        return "status";
    }
}

package ru.tigran.resourceserver.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.tigran.resourceserver.database.postgres.entity.Problem;
import ru.tigran.resourceserver.database.postgres.repository.ProblemRepository;
import ru.tigran.resourceserver.database.redis.entity.Solution;
import ru.tigran.resourceserver.database.redis.service.SolutionService;

import java.util.Optional;

@Controller
@RequestMapping("/problem")
public class ContestController {
    @Autowired
    ProblemRepository problemRepository;
    @Autowired
    SolutionService solutionService;

    @GetMapping
    public String getAllProblems(Model model){
        model.addAttribute("problems", problemRepository.findAll());
        model.addAttribute("solved", solutionService.findSolvedProblems());
        return "problemsAll";
    }

    @GetMapping(params = {"id"})
    public String getProblemPage(int id, Model model){
        Optional<Problem> problemOptional = problemRepository.findById(id);
        if (problemOptional.isEmpty()) return "404";
        model.addAttribute("problem", problemOptional.get());
        return "problem";
    }

    @GetMapping(params = {"id", "solutionId"})
    public String getProblemPage(int id, String solutionId, Model model){
        Optional<Problem> problemOptional = problemRepository.findById(id);
        if (problemOptional.isEmpty()) return "404";
        Optional<Solution> solutionOptional = solutionService.findById(solutionId);
        if (solutionOptional.isEmpty()) return "404";
        model.addAttribute("problem", problemOptional.get());
        model.addAttribute("solution", solutionOptional.get());
        return "problem";
    }
}

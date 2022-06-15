package ru.tigran.resourceserver.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/admin")
public class AdminController {
    @GetMapping("/task/create")
    public String createTask() {
        return "admin/createTask";
    }

    @GetMapping("/solutions")
    public String solutions() {
        return "admin/allSolutions";
    }

    @GetMapping("/solutions/diff")
    public String showDiff(@RequestParam String firstId, @RequestParam String secondId) {
        return "admin/diffEditor";
    }
}

package ru.tigran.resourceserver.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.tigran.resourceserver.controllers.dto.LoginDTO;

@Controller
@Slf4j
public class MainController {
    @GetMapping
    public String index(){
        return "index";
    }

    @GetMapping("/auth")
    public String login(Model model){
        model.addAttribute("login", new LoginDTO());
        return "login";
    }

    @GetMapping("/404")
    public String notFound(){
        return "404";
    }
}

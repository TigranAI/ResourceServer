package ru.tigran.resourceserver.controllers;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.List;

@ControllerAdvice
public class AdviceController {
    @ModelAttribute
    public void initUser(Model model,
                         @CookieValue(value = "user", required = false) String username,
                         @CookieValue(value = "ath", required = false) String authorities) {
        if (username != null) model.addAttribute("username", username);
        if (authorities != null) model.addAttribute("authorities", List.of(authorities.split("\\.")));
    }
}

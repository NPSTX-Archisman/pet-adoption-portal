package com.npst.petadoption;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public String healthCheck() {
        return "All Systems Go!!";
    }
}

package com.npst.petadoption;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(
        name = "Test Controller API",
        description = "Just a test controller created to test the API is working or not"
)
@RestController
public class TestController {

    @GetMapping("/")
    public String healthCheck() {
        return "All Systems Go!!";
    }
}

package com.npst.petadoption.auth.controllers;

import com.npst.petadoption.auth.dtos.*;
import com.npst.petadoption.auth.services.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(
        name = "Authentication Management",
        description = "These enpoints help a user to register themselves. It allows users as well as admins to login"
)
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @Operation(
            summary = "Registration",
            description = "Register a user to the portal"
    )
    @PostMapping("/register")
    public RegisterResponse register(
            @RequestBody RegisterRequest request
    ) {
        return authService.register(request);
    }

    @Operation(
            summary = "Login",
            description = "Login both users and admins"
    )
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request
    ) {
        LoginResult result = authService.login(request);

        ResponseCookie accessCookie = ResponseCookie.from("access_token", result.token())
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .build();

        ResponseCookie roleCookie = ResponseCookie.from("role", result.role())
                .httpOnly(false)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, accessCookie.toString())
                .header(HttpHeaders.SET_COOKIE, roleCookie.toString())
                .body(new LoginResponse("Login Successful"));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {

        ResponseCookie accessCookie = ResponseCookie.from("access_token","")
                        .path("/")
                        .maxAge(0)
                        .build();

        ResponseCookie roleCookie =
                ResponseCookie.from("role","")
                        .path("/")
                        .maxAge(0)
                        .build();

        return ResponseEntity.noContent()
                .header(
                        HttpHeaders.SET_COOKIE,
                        accessCookie.toString()
                )
                .header(
                        HttpHeaders.SET_COOKIE,
                        roleCookie.toString()
                )
                .build();
    }
}

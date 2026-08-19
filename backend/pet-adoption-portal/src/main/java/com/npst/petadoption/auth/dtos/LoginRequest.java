package com.npst.petadoption.auth.dtos;

public record LoginRequest(
        String email,
        String passwordHash
) {
}

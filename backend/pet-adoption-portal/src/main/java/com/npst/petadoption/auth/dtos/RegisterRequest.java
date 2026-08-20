package com.npst.petadoption.auth.dtos;

public record RegisterRequest(
        String fullName,
        String email,
        String passwordHash
) {
}

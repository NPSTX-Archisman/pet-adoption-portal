package com.npst.petadoption.auth.dtos;

public record LoginResult(
        String token,
        String role
) {
}

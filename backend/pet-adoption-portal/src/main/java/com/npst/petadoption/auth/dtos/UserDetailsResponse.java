package com.npst.petadoption.auth.dtos;

public record UserDetailsResponse(
        String fullName,
        String email
) {
}

package com.npst.petadoption.adoptions.dtos;

import com.npst.petadoption.adoptions.entities.AdoptionRequestStatus;

import java.time.LocalDateTime;

public record AdoptionRequestResponse(
        Long id,
        String petTag,
        String applicantEmail,
        AdoptionRequestStatus status,
        LocalDateTime requestedAt,
        LocalDateTime updatedAt
) {
}

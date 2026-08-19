package com.npst.petadoption.adoptions.mappers;

import com.npst.petadoption.adoptions.dtos.AdoptionRequestResponse;
import com.npst.petadoption.adoptions.entities.AdoptionRequest;

import java.time.LocalDateTime;

public final class AdoptionRequestMapper {

    private AdoptionRequestMapper() {
    }

    public static AdoptionRequestResponse toResponse(AdoptionRequest request) {

        return new AdoptionRequestResponse(
                request.getId(),
                request.getPet().getTag(),
                request.getApplicant().getEmail(),
                request.getStatus(),
                request.getRequestedAt(),
                request.getUpdatedAt()
        );
    }
}
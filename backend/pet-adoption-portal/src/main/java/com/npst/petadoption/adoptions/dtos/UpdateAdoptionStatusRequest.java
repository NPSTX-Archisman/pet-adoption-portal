package com.npst.petadoption.adoptions.dtos;

import com.npst.petadoption.adoptions.entities.AdoptionRequestStatus;

public record UpdateAdoptionStatusRequest(
        AdoptionRequestStatus status
) {
}

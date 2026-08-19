package com.npst.petadoption.pets.dtos;

import com.npst.petadoption.pets.entities.PetGender;
import com.npst.petadoption.pets.entities.PetSpecies;
import com.npst.petadoption.pets.entities.PetStatus;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.time.LocalDate;

public record PetResponse(
        String tag,
        String name,
        PetSpecies species,
        Integer age,
        LocalDate intakeDate,
        String breed,
        PetGender gender,
        PetStatus status,
        Double weight,
        String color,
        String description,
        String imageUrl,
        Boolean isVaccinated,
        Boolean isNeutered
) {
}

package com.npst.petadoption.pets.dtos;

import com.npst.petadoption.pets.entities.PetGender;
import com.npst.petadoption.pets.entities.PetSpecies;
import com.npst.petadoption.pets.entities.PetStatus;

public record SearchPetRequest(
        String name,
        String color,
        String breed,
        PetSpecies species,
        PetStatus status,
        PetGender gender,
        Boolean isVaccinated,
        Boolean isNeutered
){}

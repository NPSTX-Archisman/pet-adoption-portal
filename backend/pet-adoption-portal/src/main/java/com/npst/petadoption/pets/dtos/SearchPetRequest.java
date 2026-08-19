package com.npst.petadoption.pets.dtos;

import com.npst.petadoption.pets.entities.PetGender;
import com.npst.petadoption.pets.entities.PetSpecies;
import com.npst.petadoption.pets.entities.PetStatus;

public record SearchPetRequest(
        String name,
        PetSpecies species,
        PetStatus status,
        PetGender gender,
        Boolean vaccinated,
        Boolean neutered
){}

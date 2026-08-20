package com.npst.petadoption.pets.dtos;

import com.npst.petadoption.pets.entities.PetGender;

public record UpdatePetRequest (
        String name,
        String breed,
        Integer age,
        PetGender gender,
        Double weight,
        String color,
        String description,
        String imageUrl,
        Boolean vaccinated,
        Boolean neutered
) {}

package com.npst.petadoption.pets.mappers;

import com.npst.petadoption.pets.dtos.PetResponse;
import com.npst.petadoption.pets.entities.Pet;

public final class PetMapper {
    private PetMapper() {}

    public static PetResponse mapToResponse(Pet pet) {
        return new PetResponse(
                pet.getTag(),
                pet.getName(),
                pet.getSpecies(),
                pet.getAge(),
                pet.getIntakeDate(),
                pet.getBreed(),
                pet.getGender(),
                pet.getStatus(),
                pet.getWeight(),
                pet.getColor(),
                pet.getDescription(),
                pet.getImageUrl(),
                pet.getVaccinated(),
                pet.getNeutered()
        );
    }
}

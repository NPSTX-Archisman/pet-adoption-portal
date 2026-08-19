package com.npst.petadoption.pets.dtos;

import com.npst.petadoption.pets.entities.PetSpecies;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

import java.time.LocalDate;

public record CreatePetRequest(
        @NotBlank(message = "Pet name must be given, if no name available, provide some default name")
        String name,
        @NotBlank(message = "Species cannot be blank, must provide what kind of pet it is")
        PetSpecies species,
        @Min(value = 0, message = "Must provide age in days")
        Integer age,
        @NotNull(message = "Intake date must be provided")
        @PastOrPresent(message = "Date must be in the past or present")
        LocalDate intakeDate
) {
}

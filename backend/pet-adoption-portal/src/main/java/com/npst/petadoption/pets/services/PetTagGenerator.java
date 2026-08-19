package com.npst.petadoption.pets.services;

import com.npst.petadoption.pets.entities.PetSpecies;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@NoArgsConstructor
public class PetTagGenerator {

    public String generateTag(PetSpecies species, LocalDate intakeDate, long sequence){
        String code = switch (species) {
            case CAT -> "CAT";
            case DOG -> "DOG";
            case BIRD -> "BRD";
            case FISH  -> "FSH";
            case RABBIT -> "RBT";
            case GUINEA_PIG -> "GPG";
            case HAMSTER -> "HMS";
            case REPTILE -> "REP";
            case AMPHIBIAN -> "AMP";
            case INSECT -> "INS";
        };

        String year = String.valueOf(intakeDate.getYear());

        return "%s-%s-%05d".formatted(code, year, sequence);
    }
}

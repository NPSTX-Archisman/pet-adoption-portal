package com.npst.petadoption.pets.services;

import com.npst.petadoption.pets.dtos.CreatePetRequest;
import com.npst.petadoption.pets.dtos.PetResponse;
import com.npst.petadoption.pets.entities.Pet;
import com.npst.petadoption.pets.entities.PetStatus;
import com.npst.petadoption.pets.repositories.PetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetService {

    // service dependent on repository
    private final PetRepository petRepository;
    private final PetTagGenerator petTagGenerator;

    public PetService(PetRepository petRepository, PetTagGenerator petTagGenerator) {
        // injecting repository
        this.petRepository = petRepository;
        this.petTagGenerator = petTagGenerator;
    }

    public PetResponse createPet(CreatePetRequest petRequest) {
        // tag generation logic
        String tag = this.petTagGenerator.generateTag(petRequest.species(), petRequest.intakeDate(), 0); // generating the tag

        // creating the pet from the request DTO
        Pet pet = Pet.builder()
                .tag(tag)
                .name(petRequest.name())
                .species(petRequest.species())
                .age(petRequest.age())
                .intakeDate(petRequest.intakeDate())
                .status(PetStatus.AVAILABLE)
                .build();

        // saving the converted Pet to DB
        Pet savedPet = this.petRepository.save(pet);

        tag = this.petTagGenerator.generateTag(petRequest.species(), petRequest.intakeDate(), savedPet.getId()); // generating the tag
        savedPet.setTag(tag);
        this.petRepository.save(savedPet);

        // returning a new DTO by extracting from saved Pet
        return new PetResponse(
                savedPet.getTag(),
                savedPet.getName(),
                savedPet.getSpecies(),
                savedPet.getAge(),
                savedPet.getIntakeDate(),
                savedPet.getBreed(),
                savedPet.getGender(),
                savedPet.getStatus(),
                savedPet.getWeight(),
                savedPet.getColor(),
                savedPet.getDescription(),
                savedPet.getImageUrl(),
                savedPet.getIsVaccinated(),
                savedPet.getIsNeutered()
        );
    }

    public List<Pet> getAllPets() {
        return this.petRepository.findAll();
    }

    public Pet getPetByTag(String tag) {
        return this.petRepository.findByTag(tag);
    }
}

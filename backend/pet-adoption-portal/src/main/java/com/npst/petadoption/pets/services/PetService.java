package com.npst.petadoption.pets.services;

import com.npst.petadoption.adoptions.repositories.AdoptionRequestRepository;
import com.npst.petadoption.common.exceptions.ConflictException;
import com.npst.petadoption.common.exceptions.PetNotFoundException;
import com.npst.petadoption.pets.dtos.CreatePetRequest;
import com.npst.petadoption.pets.dtos.PetResponse;
import com.npst.petadoption.pets.dtos.SearchPetRequest;
import com.npst.petadoption.pets.dtos.UpdatePetRequest;
import com.npst.petadoption.pets.entities.Pet;
import com.npst.petadoption.pets.entities.PetStatus;
import com.npst.petadoption.pets.mappers.PetMapper;
import com.npst.petadoption.pets.repositories.PetRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class PetService {

    // service dependent on repository
    private final PetRepository petRepository;
    private final PetTagGenerator petTagGenerator;
    private final AdoptionRequestRepository adoptionRequestRepository;

    /**
     * Creating a new pet in the portal
     * @param petRequest fields to create the Pet
     * @return details of stored pet
     */
    @Transactional
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
        return PetMapper.mapToResponse(savedPet);
    }

    /**
     * Get a list of current Pets
     *
     * @return List of all pets
     */
    public Page<PetResponse> getAllPets(int page, int pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        return this.petRepository.findAll(pageable).map(PetMapper::mapToResponse);
    }

    /**
     * Get a single pet by its tag
     *
     * @param tag string tag
     * @return Pet object or null based on search result
     */
    public PetResponse getPetByTag(String tag) {
        return PetMapper.mapToResponse(this.petRepository.findByTag(tag)
                .orElseThrow(() -> new PetNotFoundException("Pet Not Found with tag:" + tag)));
    }

    /**
     * Search pets by filtering according to fields
     *
     * @param petRequest fields in a search request
     * @param page       which page to get
     * @param pageSize   each page size
     * @return a single page of search results
     */
    public Page<PetResponse> searchPets(SearchPetRequest petRequest, int page, int pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);

        return this.petRepository.searchPets(
                petRequest.name(),
                petRequest.species(),
                petRequest.status(),
                petRequest.gender(),
                petRequest.vaccinated(),
                petRequest.neutered(),
                pageable).map(PetMapper::mapToResponse);
    }

    /**
     * Update the details of a single pet
     * @param tag search the pet by this
     * @param petRequest details of the update
     * @return Updated pet
     */
    public PetResponse updatePet(String tag, UpdatePetRequest petRequest) {
        Pet pet = this.petRepository.findByTag(tag).orElseThrow(() -> new PetNotFoundException("Pet Not Found with tag:" + tag)); // searching the pet first

        if (petRequest.name() != null) {
            pet.setName(petRequest.name());
        }

        if (petRequest.breed() != null) {
            pet.setBreed(petRequest.breed());
        }

        if (petRequest.age() != null) {
            pet.setAge(petRequest.age());
        }

        if (petRequest.gender() != null) {
            pet.setGender(petRequest.gender());
        }

        if (petRequest.weight() != null) {
            pet.setWeight(petRequest.weight());
        }

        if (petRequest.color() != null) {
            pet.setColor(petRequest.color());
        }

        if (petRequest.description() != null) {
            pet.setDescription(petRequest.description());
        }

        if (petRequest.imageUrl() != null) {
            pet.setImageUrl(petRequest.imageUrl());
        }

        if (petRequest.vaccinated() != null) {
            pet.setVaccinated(petRequest.vaccinated());
        }

        if (petRequest.neutered() != null) {
            pet.setNeutered(petRequest.neutered());
        }

        Pet updatedPet = this.petRepository.save(pet);

        return PetMapper.mapToResponse(updatedPet);
    }

    /**
     * Delete a pet
     * @param tag to search the pet to delete
     */
    public void deletePetByTag(String tag) {
        Pet pet = this.petRepository.findByTag(tag).orElseThrow(() ->  new PetNotFoundException("Pet Not Found with tag:" + tag));

        if(adoptionRequestRepository.existsByPet(pet)) {
            throw new ConflictException(
                    "Cannot delete pet because adoption requests exist."
            );
        }

        this.petRepository.deleteById(pet.getId());
    }
}

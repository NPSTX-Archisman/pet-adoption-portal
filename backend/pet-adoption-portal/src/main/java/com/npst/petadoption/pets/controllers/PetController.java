package com.npst.petadoption.pets.controllers;

import com.npst.petadoption.pets.dtos.CreatePetRequest;
import com.npst.petadoption.pets.dtos.PetResponse;
import com.npst.petadoption.pets.dtos.SearchPetRequest;
import com.npst.petadoption.pets.dtos.UpdatePetRequest;
import com.npst.petadoption.pets.entities.Pet;
import com.npst.petadoption.pets.services.PetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(
        name = "Pet Management Endpoints",
        description = "CRUD operations on the Pet parent entity"
)
@RestController
@RequestMapping("/pets")
public class PetController {

    // controller dependent on service
    private final PetService petService;
    @Autowired
    public PetController(PetService petService) {
        this.petService = petService; // injecting service
    }

    @Operation(
            summary = "Create New Pet",
            description = "Add a new pet to the list of the portal"
    )
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public PetResponse addPet(@RequestBody CreatePetRequest petRequest){
        return this.petService.createPet(petRequest);
    }

    @Operation(
            summary = "Get All Pets",
            description = "Fetch the list of all pets in pages"
    )
    @GetMapping()
    public Page<Pet> getAllPets(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int pageSize
    ){
        return this.petService.getAllPets(page, pageSize);
    }

    @Operation(
            summary = "Get Pet By Tag",
            description = "Fetch details of a single Pet using its Tag"
    )
    @GetMapping("/{tag}")
    public Pet getPetByTag(@PathVariable("tag") String tag){
        return this.petService.getPetByTag(tag);
    }

    @Operation(
            summary = "Search Pets",
            description = "Filter and search through the pets list by using several search fields"
    )
    @PostMapping("/search")
    public Page<Pet> searchPets(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestBody SearchPetRequest petRequest
    ) {
        return this.petService.searchPets(petRequest,page, size);
    }

    @Operation(
            summary = "Update Pet",
            description = "Update a single pet using its tag"
    )
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{tag}")
    public PetResponse updatePet(
            @PathVariable("tag") String tag,
            @RequestBody UpdatePetRequest petRequest
            ) {
        return this.petService.updatePet(tag, petRequest);
    }

    @Operation(
            summary = "Delete Pet",
            description = "Remove a pet's details from the portal using its tag"
    )
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{tag}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePet(
            @PathVariable("tag") String tag
    ) {
        this.petService.deletePetByTag(tag);
    }
}

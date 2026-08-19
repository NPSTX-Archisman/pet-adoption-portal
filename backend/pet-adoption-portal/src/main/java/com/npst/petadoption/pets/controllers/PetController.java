package com.npst.petadoption.pets.controllers;

import com.npst.petadoption.pets.dtos.CreatePetRequest;
import com.npst.petadoption.pets.dtos.PetResponse;
import com.npst.petadoption.pets.entities.Pet;
import com.npst.petadoption.pets.services.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pets")
public class PetController {

    // controller dependent on service
    private final PetService petService;
    @Autowired
    public PetController(PetService petService) {
        this.petService = petService; // injecting service
    }

    @PostMapping("/add")
    public PetResponse addPet(@RequestBody CreatePetRequest petRequest){
        return this.petService.createPet(petRequest);
    }

    @GetMapping()
    public List<Pet> getAllPets(){
        return this.petService.getAllPets();
    }

    @GetMapping("/{tag}")
    public Pet getPetByTag(@PathVariable("tag") String tag){
        return this.petService.getPetByTag(tag);
    }
}

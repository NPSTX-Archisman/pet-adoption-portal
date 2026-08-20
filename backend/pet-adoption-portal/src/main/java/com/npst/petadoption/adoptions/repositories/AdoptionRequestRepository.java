package com.npst.petadoption.adoptions.repositories;

import com.npst.petadoption.adoptions.entities.AdoptionRequest;
import com.npst.petadoption.adoptions.entities.AdoptionRequestStatus;
import com.npst.petadoption.pets.entities.Pet;
import com.npst.petadoption.users.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdoptionRequestRepository extends JpaRepository<AdoptionRequest, Long> {

    List<AdoptionRequest> findByPet(Pet pet);

    List<AdoptionRequest> findByPetAndStatus(Pet pet, AdoptionRequestStatus status);

    List<AdoptionRequest> findByApplicant(User applicant);
}

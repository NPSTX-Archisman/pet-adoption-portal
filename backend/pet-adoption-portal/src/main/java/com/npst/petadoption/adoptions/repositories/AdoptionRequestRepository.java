package com.npst.petadoption.adoptions.repositories;

import com.npst.petadoption.adoptions.entities.AdoptionRequest;
import com.npst.petadoption.adoptions.entities.AdoptionRequestStatus;
import com.npst.petadoption.pets.entities.Pet;
import com.npst.petadoption.users.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdoptionRequestRepository extends JpaRepository<AdoptionRequest, Long> {

    Page<AdoptionRequest> findByPet(Pet pet, Pageable pageable);

    List<AdoptionRequest> findByPet(Pet pet);

    List<AdoptionRequest> findByPetAndStatus(Pet pet, AdoptionRequestStatus status);

    Page<AdoptionRequest> findByApplicant(User applicant, Pageable pageable);

    boolean existsByPet(Pet pet);
}

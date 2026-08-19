package com.npst.petadoption.adoptions.services;

import com.npst.petadoption.adoptions.dtos.AdoptionRequestResponse;
import com.npst.petadoption.adoptions.dtos.CreateAdoptionRequest;
import com.npst.petadoption.adoptions.entities.AdoptionRequest;
import com.npst.petadoption.adoptions.entities.AdoptionRequestStatus;
import com.npst.petadoption.adoptions.mappers.AdoptionRequestMapper;
import com.npst.petadoption.adoptions.repositories.AdoptionRequestRepository;
import com.npst.petadoption.common.exceptions.ConflictException;
import com.npst.petadoption.common.exceptions.PetNotFoundException;
import com.npst.petadoption.common.exceptions.UserNotFoundException;
import com.npst.petadoption.pets.entities.Pet;
import com.npst.petadoption.pets.entities.PetStatus;
import com.npst.petadoption.pets.repositories.PetRepository;
import com.npst.petadoption.users.entities.User;
import com.npst.petadoption.users.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdoptionRequestService {

    private final AdoptionRequestRepository repository;
    private final PetRepository petRepository;
    private final UserRepository userRepository;

    public AdoptionRequestResponse createRequest(CreateAdoptionRequest request, String email) {
        User user = this.userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        Pet pet = this.petRepository.findByTag(request.petTag()).orElseThrow(() -> new PetNotFoundException("Pet not found with tag: " + request.petTag()));

        if (pet.getStatus() == PetStatus.ADOPTED) {
            throw new ConflictException("Pet is already adopted");
        }

        AdoptionRequest adoptionRequest = AdoptionRequest.builder()
                .pet(pet)
                .applicant(user)
                .status(AdoptionRequestStatus.PENDING)
                .build();

        AdoptionRequest saved = this.repository.save(adoptionRequest);

        if (pet.getStatus() == PetStatus.AVAILABLE) {
            pet.setStatus(PetStatus.PENDING_ADOPTION);
            this.petRepository.save(pet);
        }

        return AdoptionRequestMapper.toResponse(saved);
    }

    public List<AdoptionRequestResponse> getMyRequests(String email) {

        User user = this.userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));

        return this.repository.findByApplicant(user).stream().map(AdoptionRequestMapper::toResponse).toList();
    }
}

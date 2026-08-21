package com.npst.petadoption.adoptions.services;

import com.npst.petadoption.adoptions.dtos.AdoptionRequestResponse;
import com.npst.petadoption.adoptions.dtos.CreateAdoptionRequest;
import com.npst.petadoption.adoptions.dtos.UpdateAdoptionStatusRequest;
import com.npst.petadoption.adoptions.entities.AdoptionRequest;
import com.npst.petadoption.adoptions.entities.AdoptionRequestStatus;
import com.npst.petadoption.adoptions.mappers.AdoptionRequestMapper;
import com.npst.petadoption.adoptions.repositories.AdoptionRequestRepository;
import com.npst.petadoption.common.exceptions.ConflictException;
import com.npst.petadoption.common.exceptions.PetNotFoundException;
import com.npst.petadoption.common.exceptions.ResourceNotFoundException;
import com.npst.petadoption.common.exceptions.UserNotFoundException;
import com.npst.petadoption.pets.entities.Pet;
import com.npst.petadoption.pets.entities.PetStatus;
import com.npst.petadoption.pets.repositories.PetRepository;
import com.npst.petadoption.users.entities.User;
import com.npst.petadoption.users.repositories.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdoptionRequestService {

    private final AdoptionRequestRepository repository;
    private final PetRepository petRepository;
    private final UserRepository userRepository;

    @Transactional
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
                .requestedAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        AdoptionRequest saved = this.repository.save(adoptionRequest);

        if (pet.getStatus() == PetStatus.AVAILABLE) {
            pet.setStatus(PetStatus.PENDING_ADOPTION);
            this.petRepository.save(pet);
        }

        return AdoptionRequestMapper.toResponse(saved);
    }

    public Page<AdoptionRequestResponse> getMyRequests(String email, int page, int pageSize) {

        User user = this.userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));

        Pageable pageable = PageRequest.of(page, pageSize);

        return this.repository.findByApplicant(user, pageable).map(AdoptionRequestMapper::toResponse);
    }

    public Page<AdoptionRequestResponse> getRequestsForPet(String tag, int page, int pageSize) {
        Pet pet = this.petRepository.findByTag(tag).orElseThrow(() -> new PetNotFoundException("Pet not found with tag: " + tag));

        Pageable pageable = PageRequest.of(page, pageSize);

        return this.repository.findByPet(pet, pageable).map(AdoptionRequestMapper::toResponse);
    }

    @Transactional
    public AdoptionRequestResponse updateStatus(Long id, UpdateAdoptionStatusRequest request) {
        AdoptionRequest adoptionRequest = this.repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Adoption request not found with id: " + id));
        AdoptionRequestStatus currentStatus = adoptionRequest.getStatus();
        AdoptionRequestStatus targetStatus = request.status();

        validateTransition(currentStatus, targetStatus);

        if (targetStatus.equals(AdoptionRequestStatus.APPROVED)) {
            Pet pet = adoptionRequest.getPet(); // find the pet

            // throw exception if already adopted
            if (pet.getStatus() == PetStatus.ADOPTED) {
                throw new ConflictException("Pet is already adopted");
            }

            // else complete the process
            adoptionRequest.setStatus(AdoptionRequestStatus.APPROVED);
            pet.setStatus(PetStatus.ADOPTED);

            this.petRepository.save(pet); // save the updated status
            rejectRemainingRequests(pet, adoptionRequest.getId());
        } else {
            adoptionRequest.setStatus(targetStatus);
        }

        adoptionRequest.setUpdatedAt(LocalDateTime.now());

        return AdoptionRequestMapper.toResponse(this.repository.save(adoptionRequest));
    }

    private void validateTransition(AdoptionRequestStatus current, AdoptionRequestStatus target) {
        switch (current) {
            case PENDING ->  {
                if (target != AdoptionRequestStatus.CHECKIN && target != AdoptionRequestStatus.REJECTED) {
                    throw new ConflictException("You have to perform the Home Check first");
                }
            }

            case CHECKIN ->  {
                if (target != AdoptionRequestStatus.PAYMENT_PENDING && target != AdoptionRequestStatus.REJECTED) {
                    throw new ConflictException("You have to make the payment first");
                }
            }

            case PAYMENT_PENDING -> {
                if (target != AdoptionRequestStatus.APPROVED && target != AdoptionRequestStatus.REJECTED) {
                    throw new ConflictException("You can only approve or reject the request.");
                }
            }

            case APPROVED,REJECTED -> {
                throw new ConflictException("You cannot change the final status!");
            }
        }
    }

    private void rejectRemainingRequests(Pet pet, Long id) {
        List<AdoptionRequest> rejectedRequests = this.repository.findByPet(pet);

        rejectedRequests.forEach(rejectedRequest -> {
            if (
                    !rejectedRequest.getId().equals(id) && rejectedRequest.getStatus() != AdoptionRequestStatus.APPROVED
                    && rejectedRequest.getStatus() != AdoptionRequestStatus.REJECTED
            ) {
                rejectedRequest.setStatus(AdoptionRequestStatus.REJECTED);
            }
        });

        this.repository.saveAll(rejectedRequests);
    }

    public Page<AdoptionRequestResponse> getAllRequests(int page, int pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        return this.repository.findAll(pageable).map(AdoptionRequestMapper::toResponse);
    }

    @Transactional
    public void deleteRequestById(Long requestId) {

        AdoptionRequest request =
                this.repository.findById(requestId).orElseThrow(() -> new ResourceNotFoundException("Request not found"));

        Pet pet = request.getPet();
        this.repository.delete(request);
        this.repository.flush();
        List<AdoptionRequest> remainingRequests = this.repository.findByPet(pet);
        if (remainingRequests.isEmpty() && pet.getStatus() == PetStatus.PENDING_ADOPTION) {
            pet.setStatus(PetStatus.AVAILABLE);
            petRepository.save(pet);
        }
    }
}

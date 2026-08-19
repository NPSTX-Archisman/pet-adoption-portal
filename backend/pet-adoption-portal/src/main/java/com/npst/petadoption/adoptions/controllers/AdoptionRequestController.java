package com.npst.petadoption.adoptions.controllers;

import com.npst.petadoption.adoptions.dtos.AdoptionRequestResponse;
import com.npst.petadoption.adoptions.dtos.CreateAdoptionRequest;
import com.npst.petadoption.adoptions.services.AdoptionRequestService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/adoptions")
@RequiredArgsConstructor
@Tag(
        name = "Adoption Requests"
)
public class AdoptionRequestController {

    private final AdoptionRequestService adoptionRequestService;

    @PostMapping("/request")
    @PreAuthorize("hasRole('USER')")
    public AdoptionRequestResponse createRequest(
            @RequestBody
            CreateAdoptionRequest request
    ) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        return adoptionRequestService.createRequest(request, email);
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('USER')")
    public List<AdoptionRequestResponse> getMyRequests() {

        String email = SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        return adoptionRequestService.getMyRequests(email);
    }
}
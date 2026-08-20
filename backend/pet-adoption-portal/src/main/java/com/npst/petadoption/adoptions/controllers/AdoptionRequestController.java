package com.npst.petadoption.adoptions.controllers;

import com.npst.petadoption.adoptions.dtos.AdoptionRequestResponse;
import com.npst.petadoption.adoptions.dtos.CreateAdoptionRequest;
import com.npst.petadoption.adoptions.dtos.UpdateAdoptionStatusRequest;
import com.npst.petadoption.adoptions.services.AdoptionRequestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/adoptions")
@RequiredArgsConstructor
@Tag(
        name = "Adoption Requests",
        description = "Manage adoption requests for users and pets"
)
public class AdoptionRequestController {

    private final AdoptionRequestService adoptionRequestService;

    @Operation(
            summary = "Apply",
            description = "Apply to adopt a pet"
    )
    @PostMapping("/request")
    @PreAuthorize("hasRole('USER')")
    public AdoptionRequestResponse createRequest(
            @RequestBody
            CreateAdoptionRequest request
    ) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        return adoptionRequestService.createRequest(request, email);
    }

    @Operation(
            summary = "Adoption Requests",
            description = "All adoption requests made by a user"
    )
    @GetMapping("/my")
    @PreAuthorize("hasRole('USER')")
    public Page<AdoptionRequestResponse> getMyRequests(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int pageSize
    ) {

        String email = SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        return adoptionRequestService.getMyRequests(email, page, pageSize);
    }

    @Operation(
            summary = "Approve request",
            description = "Move an adoption request through various stages"
    )
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public AdoptionRequestResponse updateRequestStatus(
            @PathVariable("id") Long id,
            @RequestBody UpdateAdoptionStatusRequest request
    ) {
        return this.adoptionRequestService.updateStatus(id, request);
    }

    @Operation(
            summary = "All Requests",
            description = "Get all adoption requests"
    )
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Page<AdoptionRequestResponse> getAllRequests(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int pageSize
    ) {
        return this.adoptionRequestService.getAllRequests(page, pageSize);
    }

    @Operation(
            summary = "Delete",
            description = "Delete a particular request from history"
    )
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRequest(@PathVariable Long id) {
        this.adoptionRequestService.deleteRequestById(id);
    }

}
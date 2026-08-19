package com.npst.petadoption.adoptions.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="adoption_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdoptionRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private String id;
}

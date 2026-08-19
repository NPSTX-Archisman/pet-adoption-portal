package com.npst.petadoption.pets.entities;

import com.npst.petadoption.adoptions.entities.AdoptionRequest;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name="pets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    // required parameters

    // specific tags to search on
    @Column(unique = true, nullable = false)
    private String tag;

    // name if available, else put a generic name
    @Column(nullable = false, length = 100)
    private String name;

    // only allowed species
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PetSpecies species;

    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false)
    private LocalDate intakeDate;

    // optional parameters
    @Builder.Default
    private String breed = "";

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private PetGender gender = PetGender.UNKNOWN;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private PetStatus status = PetStatus.AVAILABLE;

    @Column(scale = 2)
    private Double weight;

    @Column(length = 20)
    private String color;

    @Column(length = 200)
    private String description;

    @Builder.Default
    private String imageUrl = "https://thumbs.dreamstime.com/b/dog-listening-big-ear-27392035.jpg";

    @Column(name = "is_vaccinated")
    @Builder.Default
    private Boolean vaccinated = false;

    @Column(name = "is_neutered")
    @Builder.Default
    private Boolean neutered = false;

    @OneToMany(mappedBy = "pet")
    private List<AdoptionRequest> requests;

}

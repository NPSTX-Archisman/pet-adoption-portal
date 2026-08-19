package com.npst.petadoption.pets.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

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
    private String breed = "";

    @Enumerated(EnumType.STRING)
    private PetGender gender = PetGender.UNKNOWN;

    @Enumerated(EnumType.STRING)
    private PetStatus status = PetStatus.AVAILABLE;

    @Column(scale = 2)
    private Double weight;

    @Column(length = 20)
    private String color;

    @Column(length = 200)
    private String description;

    private String imageUrl = "https://thumbs.dreamstime.com/b/dog-listening-big-ear-27392035.jpg";

    private Boolean isVaccinated = false;
    private Boolean isNeutered = false;

}

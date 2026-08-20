package com.npst.petadoption.pets.repositories;

import com.npst.petadoption.pets.entities.Pet;
import com.npst.petadoption.pets.entities.PetGender;
import com.npst.petadoption.pets.entities.PetSpecies;
import com.npst.petadoption.pets.entities.PetStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PetRepository extends JpaRepository<Pet,Long> {

    Optional<Pet> findByTag(String tag);

    @Query("""
    SELECT p FROM Pet p
    WHERE (:name IS NULL OR LOWER(p.name) LIKE CONCAT('%',LOWER(CAST(:name AS string)),'%'))
        AND (:species IS NULL OR p.species = :species)
        AND (:status IS NULL OR p.status = :status)
        AND (:gender IS NULL OR p.gender = :gender)
        AND (:vaccinated IS NULL OR p.vaccinated = :vaccinated)
        AND (:neutered IS NULL OR p.neutered = :neutered)
    """)
    Page<Pet> searchPets(
            @Param("name") String name,
            @Param("species") PetSpecies species,
            @Param("status") PetStatus status,
            @Param("gender")PetGender gender,
            @Param("vaccinated") Boolean vaccinated,
            @Param("neutered") Boolean neutered,
            Pageable pageable
            );
}

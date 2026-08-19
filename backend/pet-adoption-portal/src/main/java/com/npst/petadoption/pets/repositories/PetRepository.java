package com.npst.petadoption.pets.repositories;

import com.npst.petadoption.pets.entities.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetRepository extends JpaRepository<Pet,Long> {

    Pet findByTag(String tag);
}

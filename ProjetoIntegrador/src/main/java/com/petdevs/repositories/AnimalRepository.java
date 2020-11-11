package com.petdevs.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petdevs.models.Animal;

public interface AnimalRepository extends JpaRepository<Animal, Long>{

	Optional<Animal> findByNomeAnimal(String nome);
	
		
}

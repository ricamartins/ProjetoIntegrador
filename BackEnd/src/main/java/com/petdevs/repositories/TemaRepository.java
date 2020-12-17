package com.petdevs.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petdevs.models.Tema;

public interface TemaRepository extends JpaRepository<Tema, Long> {

	Optional<Tema> findByNomeTema(String nome);


}

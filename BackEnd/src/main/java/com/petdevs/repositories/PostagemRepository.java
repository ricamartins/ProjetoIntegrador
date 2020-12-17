package com.petdevs.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petdevs.models.Postagem;

public interface PostagemRepository extends JpaRepository<Postagem, Long>{

}

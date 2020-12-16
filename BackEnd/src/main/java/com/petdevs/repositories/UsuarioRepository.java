package com.petdevs.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petdevs.models.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	Optional<Usuario> findByNomeUsuario(String nome);

	Optional<Usuario> findByEmailUsuario(String email);

}

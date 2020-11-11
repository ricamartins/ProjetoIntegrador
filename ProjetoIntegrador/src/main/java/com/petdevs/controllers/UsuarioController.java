package com.petdevs.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.petdevs.models.Usuario;
import com.petdevs.repositories.UsuarioRepository;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

	
	@Autowired
	private UsuarioRepository repository;
	
	@GetMapping
	public ResponseEntity<List<Usuario>> buscarTodos(){

		return ResponseEntity.ok(repository.findAll());
	}
	
	@GetMapping("/id/{id}")
	public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id){
										  //parametro			//ação
		return repository.findById(id)
				.map(usuario -> ResponseEntity.ok(usuario))
				.orElse(ResponseEntity.notFound().build());	
	}
 	
	@GetMapping("/nome/{nome}")
	public ResponseEntity<Usuario> buscarPorNome(@PathVariable String nome){
		
		return repository.findByNomeCompleto(nome).map(usuario -> ResponseEntity.ok(usuario))
				.orElse(ResponseEntity.notFound().build());
	}

	@PutMapping
	public  ResponseEntity<Usuario> atualizarUsuario(@RequestBody Usuario usuario){
		
		return ResponseEntity.ok(repository.save(usuario));
	}
	
	@PostMapping
	public  ResponseEntity<Usuario> postarUsuario(@RequestBody Usuario usuario){
		
		return ResponseEntity.ok(repository.save(usuario));
	}
	
	@DeleteMapping("/id/{id}")
	public void deletarUsuario(@PathVariable long id) {
		repository.deleteById(id);	
	}
	
	
	
	
	
}

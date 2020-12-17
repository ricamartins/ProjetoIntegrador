package com.petdevs.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.petdevs.models.Tema;
import com.petdevs.repositories.TemaRepository;

@RestController
@RequestMapping("/tema")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TemaController {
	
	@Autowired
	private TemaRepository repository;
	
	@GetMapping
	public ResponseEntity<List<Tema>> buscarTodos(){
		
		return ResponseEntity.ok(repository.findAll());
	
	}
	
	@GetMapping("/id/{id}")
	public ResponseEntity<Tema> buscarPorId(@PathVariable Long id){
										  //parametro			//ação
		return repository.findById(id)
				.map(tema -> ResponseEntity.ok(tema))
				.orElse(ResponseEntity.notFound().build());
	}
 	
	@GetMapping("/nome/{nome}")
	public ResponseEntity<Tema> buscarPorNome(@PathVariable String nome){
		
		return repository.findByNomeTema(nome)
				.map(tema -> ResponseEntity.ok(tema))
				.orElse(ResponseEntity.notFound().build());
	}

	@PutMapping
	public  ResponseEntity<Tema> atualizarTema(@RequestBody Tema tema){
		
		return ResponseEntity.ok(repository.save(tema));
	}
	
	@PostMapping
	public  ResponseEntity<Tema> postarTema(@RequestBody Tema tema){
		
		return ResponseEntity.ok(repository.save(tema));
	}
	
	@DeleteMapping("/id/{id}")
	public void deletarTema(@PathVariable long id) {
		
		repository.deleteById(id);	
		
	}
	
	
	
	
	
	
	

}

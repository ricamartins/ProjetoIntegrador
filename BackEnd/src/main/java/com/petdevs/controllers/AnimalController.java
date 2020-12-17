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

import com.petdevs.models.Animal;
import com.petdevs.repositories.AnimalRepository;

@RestController
@RequestMapping("/animal")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AnimalController {

	@Autowired
	private AnimalRepository repository;
	
	@GetMapping
	public ResponseEntity<List<Animal>> buscarTodos(){

		return ResponseEntity.ok(repository.findAll());
	}
	
	@GetMapping("/id/{id}")
	public ResponseEntity<Animal> buscarPorId(@PathVariable Long id){
										  //parametro			//ação
		return repository.findById(id)
				.map(animal -> ResponseEntity.ok(animal))
				.orElse(ResponseEntity.notFound().build());	
	}
 	
	@GetMapping("/nome/{nome}")
	public ResponseEntity<Animal> buscarPorNomeAnimal(@PathVariable String nome){
		
		return repository.findByNomeAnimal(nome).map(usuario -> ResponseEntity.ok(usuario))
				.orElse(ResponseEntity.notFound().build());
	}

	@PutMapping
	public  ResponseEntity<Animal> atualizarAnimal(@RequestBody Animal animal){
		
		return ResponseEntity.ok(repository.save(animal));
	}
	
	@PostMapping
	public  ResponseEntity<Animal> postarAnimal(@RequestBody Animal animal){
		
		return ResponseEntity.ok(repository.save(animal));
	}
	
	@DeleteMapping("/id/{id}")
	public void deletarAnimal(@PathVariable long id) {
		repository.deleteById(id);	
	}

	
}

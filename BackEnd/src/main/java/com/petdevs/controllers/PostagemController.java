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

import com.petdevs.models.Postagem;
import com.petdevs.repositories.PostagemRepository;

@RestController
@RequestMapping("/postagem")
public class PostagemController {
	
	@Autowired
	private PostagemRepository repository;
	
	@GetMapping
	public ResponseEntity<List<Postagem>> buscarTodos(){

		return ResponseEntity.ok(repository.findAll());
	}
	
	@GetMapping("/id/{id}")
	public ResponseEntity<Postagem> buscarPorId(@PathVariable Long id){
										  //parametro			//ação
		return repository.findById(id)
				.map(postagem -> ResponseEntity.ok(postagem))
				.orElse(ResponseEntity.notFound().build());	
	}
 	
//	@GetMapping("/nome/{nome}")
//	public ResponseEntity<Postagem> buscarPorNome(@PathVariable String nome){
//		
//		return repository.findByNomeAnimal(nome).map(animal -> ResponseEntity.ok(animal))
//				.orElse(ResponseEntity.notFound().build());
//	}

	@PutMapping
	public  ResponseEntity<Postagem> atualizarPostagem(@RequestBody Postagem postagem){
		
		return ResponseEntity.ok(repository.save(postagem));
	}
	
	@PostMapping
	public  ResponseEntity<Postagem> postarPostagem(@RequestBody Postagem postagem){
		
		return ResponseEntity.ok(repository.save(postagem));
	}
	
	@DeleteMapping("/id/{id}")
	public void deletarPostagem(@PathVariable long id) {
		repository.deleteById(id);	
	}
	
	
	

}

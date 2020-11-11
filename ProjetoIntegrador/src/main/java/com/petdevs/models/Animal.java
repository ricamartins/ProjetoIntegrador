package com.petdevs.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="tb_animais")
public class Animal {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	
	@NotEmpty
	@Enumerated(EnumType.STRING)
	private Tamanho tamanhoAnimal;

	@Column
	@NotEmpty
	private String tipoAnimal;
	
	@Column
	@NotEmpty
	private String nomeAnimal;
	
	@Column
	@NotEmpty
	private int idadeAnimal;
	
	@OneToOne(mappedBy = "animal")
	private Postagem postagem;
	
	
	@ManyToOne
	@JsonIgnoreProperties("animais")
	private Usuario usuario;

	public enum Tamanho {PP,P,M,G};
}





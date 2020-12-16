import { Postagem } from "./Postagem"
import { Usuario } from "./Usuario"

export class Animal {
    public id!: number
	public tamanhoAnimal!: string
	public tipoAnimal!: string
	public nomeAnimal!: string
	public idadeAnimal!: number
	public postagem!: Postagem
	public usuario!: Usuario
}
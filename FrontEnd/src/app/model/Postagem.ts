import { Animal } from "./Animal"
import { Tema } from "./Tema"
import { Usuario } from "./Usuario"

export class Postagem {
	public id!: number
	public data!: Date
	public descricao!: string
	public localizacao!: string
	public midia!: string
	public tema!: Tema
	public usuario!: Usuario
    public animal!: Animal
}
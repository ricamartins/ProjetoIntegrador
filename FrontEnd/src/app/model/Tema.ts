import { Postagem } from "./Postagem"

export class Tema {
	public id!: number
	public nomeTema!: string
	public listaPostagens!: Postagem[]
}
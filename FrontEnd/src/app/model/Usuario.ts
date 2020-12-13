import { ClassField } from "@angular/compiler"

export class Usuario{
	public id!: number
	public nomeCompleto!: string
	public emailUsuario!: string
	public senhaUsuario!: string
	public fotoUsuario: string = 'https://res.cloudinary.com/ricamartins/image/upload/v1607472904/default-user-image_bh0uz4.png'
	public avaliacaoUsuario: number = 5
	public telefoneUsuario!: string
}
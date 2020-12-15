import { ClassField } from "@angular/compiler"

export class Usuario{
	public id!: number
	public nomeUsuario!: string
	public emailUsuario!: string
	public senhaUsuario!: string
	public fotoUsuario: string = 'https://res.cloudinary.com/ricamartins/image/upload/v1608051752/matchpet/default-user-image.png'
	public avaliacaoUsuario: number = 5
	public telefoneUsuario!: string
}
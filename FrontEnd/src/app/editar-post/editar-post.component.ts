import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from '../model/Animal';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { MidiaService } from '../service/midia.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-editar-post',
  templateUrl: './editar-post.component.html',
  styleUrls: ['./editar-post.component.css']
})
export class EditarPostComponent implements OnInit {

  postagem: Postagem = new Postagem()
  animal: Animal = new Animal()
  tema: Tema = new Tema()
  usuario: Usuario = new Usuario()
  imagem!: File 

  constructor(
    private postagemService: PostagemService,
    private midiaService: MidiaService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    window.scroll(0, 0)
    this.postagem.id = parseInt(this.route.snapshot.params["id"])
    this.pegarPostagem(this.postagem.id)
    console.log(this.postagem)
  }

  pegarPostagem(id: number) {
    this.postagemService.getPostagemById(id).subscribe((resp: Postagem) => {
      console.log(resp)
      this.postagem = resp
    })
  }

  carregarImagem(event: any) {
    this.imagem = this.midiaService.carregarImagemPreview(event.target.files[0])
  }

  editar() {

    this.postagem.usuario = this.usuario

    //tema adoção fixado de começo, podemos mudar depois
    this.tema.id = 1
    this.postagem.tema = this.tema
    
    this.postagem.animal = this.animal

    if (this.imagem != null) {
      this.midiaService.uploadPhoto(this.imagem).subscribe((resp) => {
        
        this.postagem.midia = resp.secure_url
        
        this.animal.usuario = this.usuario
        this.postagemService.editarAnimal(this.animal).subscribe((resp: Animal) => {
          this.postagem.animal = resp
          
          this.postagemService.editarPostagem(this.postagem).subscribe((resp: Postagem) => {
            this.postagem = resp
            this.router.navigate(['/home'])
            alert('Postagem alterada com sucesso!')
          })
        })
      })
    } else {
      alert("Inclua os dados do animal e uma foto")
    }
  }
}

import { Usuario } from './../model/Usuario';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Router } from '@angular/router';
import { PostagemService } from '../service/postagem.service';
import { Postagem } from '../model/Postagem';
import { MidiaService } from '../service/midia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pagina: string = 'carrossel'
  usuario: Usuario = new Usuario();
  emailUsuario!: string
 
  indexPostagens: number = 0
  postagens!: Postagem[]

  imagem!: File

  constructor(
    private usuarioService: UsuarioService,
    private midiaService: MidiaService,
    private router: Router,
    private postagemService: PostagemService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token')
    if (!token) this.router.navigate(['/login'])

    window.scroll(0, 0)
    
    this.emailUsuario = localStorage.getItem('user_email')!
    this.pegarInformacoesUsuario(this.emailUsuario)
    this.pegarPostagens()
  }

  promover() {
    // let button: HTMLAnchorElement = document.querySelector("#carousel-next") as HTMLAnchorElement
    // button.click()
    if(this.indexPostagens < this.postagens.length){
      this.indexPostagens++
    } else {
      this.indexPostagens = 0
    }
    let carrosselItem: HTMLDivElement = document.querySelector('#carrosselItem') as HTMLDivElement
    (<HTMLImageElement>carrosselItem.children[0]).src = this.postagens[this.indexPostagens].midia;
    (<HTMLHeadingElement>carrosselItem.children[1].children[0]).innerText = this.postagens[this.indexPostagens].animal.nomeAnimal;
    (<HTMLParagraphElement>carrosselItem.children[1].children[1]).innerText = "TAM: " + this.postagens[this.indexPostagens].animal.tamanhoAnimal +' | '+ this.postagens[this.indexPostagens].descricao;
  }

  pegarInformacoesUsuario(email: string) {
    this.usuarioService.getUsuarioByEmail(email).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  pegarPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.postagens = resp

    })
  }

  apagarPostagem(event: any) {
    let ids = event.target.nextSibling.innerText.split(',')
    let idPostagem = parseInt(ids[0])
    let idAnimal = parseInt(ids[1])
    this.postagemService.deletePostagem(idPostagem).subscribe(() => {
      this.postagemService.deleteAnimal(idAnimal).subscribe(() => {
        alert("Postagem apagada com sucesso")
      })
    })
  }

  conteudo() {
    return this.pagina
  }

  carregarImagem(event: any) {
    this.imagem = this.midiaService.carregarImagemPreview(event.target.files[0])
  }

  editar() {
    
    if (this.imagem != null) {
      this.midiaService.uploadPhoto(this.imagem).subscribe((resp) => {
        
        this.usuario.fotoUsuario = resp.secure_url
        
        this.usuarioService.editarUsuario(this.usuario).subscribe((resp: Usuario) => {
          this.usuario = resp
          this.router.navigate(['/home'])
          alert('Foto alterada com sucesso')  
        })
      })
    }
  }
}

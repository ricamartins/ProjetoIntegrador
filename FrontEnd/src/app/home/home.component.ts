import { Usuario } from './../model/Usuario';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Router } from '@angular/router';
import { PostagemService } from '../service/postagem.service';
import { Postagem } from '../model/Postagem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pagina: string = 'carrossel'
  usuario: Usuario = new Usuario();
  emailUsuario!: string

  postagens!: Postagem[]

  constructor(
    private usuarioService: UsuarioService,
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
    let button: HTMLAnchorElement = document.querySelector("#carousel-next") as HTMLAnchorElement
    button.click()
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

  conteudo() {
    return this.pagina
  }
}

import { Usuario } from './../model/Usuario';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pagina: string = 'carrossel'
  usuario: Usuario = new Usuario();
  idUsuario!: number

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {

    let token = localStorage.getItem('token')
    if (!token) this.router.navigate(['/login'])

    window.scroll(0, 0)
    
    this.idUsuario = parseInt(localStorage.getItem('user_id')!)
    this.pegarInformacoesUsuario(this.idUsuario)
  }

  promover() {
    let button: HTMLAnchorElement = document.querySelector("#carousel-next") as HTMLAnchorElement
    button.click()
  }

  pegarInformacoesUsuario(id: number) {
    this.usuarioService.getUsuarioById(id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  conteudo() {
    return this.pagina
  }
}

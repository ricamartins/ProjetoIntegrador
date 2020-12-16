import { UsuarioService } from './../service/usuario.service';
import { Usuario } from './../model/Usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarioLogin: UsuarioLogin = new UsuarioLogin()
  user_id!: number
  usuario: Usuario = new Usuario()
  constructor(private auth: AuthService, private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    window.scroll(0, 0)
  }
  
  logar() {
    
    this.auth.logar(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {
      this.usuarioLogin = resp
      localStorage.setItem('token', this.usuarioLogin.token)
      localStorage.setItem('user_email', this.usuarioLogin.email)
      this.router.navigate(['/home'])
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  usuario: Usuario = new Usuario()
  senha!: string
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  capturarSenha(event: any) {
    this.senha = event.target.value
  }
  cadastrar() {
    if (this.senha === this.usuario.senhaUsuario) {
      this.auth.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
      })
      this.router.navigate(['/login'])
      alert('Usuario cadastrado')

    } else (
      alert('Senha incorreta')
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { MidiaService } from '../service/midia.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  usuario: Usuario = new Usuario()
  senha!: string
  imagem!: File
  constructor(private auth: AuthService, private midiaService: MidiaService, private router: Router) { }

  ngOnInit(): void {
    window.scroll(0, 0)
  }

  capturarSenha(event: any) {
    this.senha = event.target.value
  }

  carregarImagemPreview(event: any) {
    this.imagem = event.target.files[0]
    let url = URL.createObjectURL(this.imagem);
    (<HTMLImageElement>document.querySelector('img#imagem-preview'))!.src = url
  }

  cadastrar() {
    
    if (this.senha === this.usuario.senhaUsuario) {
      
      if (this.imagem != null) {
        this.midiaService.uploadPhoto(this.imagem).subscribe((resp) => {
          
          this.usuario.fotoUsuario = resp.secure_url
          
          this.auth.cadastrar(this.usuario).subscribe((resp: Usuario) => {
            this.usuario = resp
            this.router.navigate(['/login'])
            alert('Usuário cadastrado com sucesso!')  
          })
        })
      } else {
        //imagem e avaliação padrão
        this.usuario.avaliacaoUsuario = 5
        this.usuario.fotoUsuario = 'https://res.cloudinary.com/ricamartins/image/upload/v1608051752/matchpet/default-user-image.png'
        this.auth.cadastrar(this.usuario).subscribe((resp: Usuario) => {
          this.usuario = resp
          this.router.navigate(['/login'])
          alert('Usuário cadastrado com sucesso!')
        })
      }
      
        

    } else (
      alert('Senha incorreta')
    )
  }
}

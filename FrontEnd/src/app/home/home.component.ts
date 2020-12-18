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

  conteudo: string = 'carrossel'
  usuario: Usuario = new Usuario();
  emailUsuario!: string
 
  indexPostagens: number = 0
  postagens: Postagem[] = new Array()
  postagensUsuario: Postagem[] = new Array()
  postagensFiltradas: Postagem[] = new Array()

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
    this.indexPostagens++
    if(this.indexPostagens >= this.postagens.length){
      this.indexPostagens = 0
    }
    // else {
    //   this.indexPostagens = 0
    // }


    let carrosselItem: HTMLDivElement = document.querySelector('#carrosselItem') as HTMLDivElement
    (<HTMLImageElement>carrosselItem.children[0]).src = this.postagensFiltradas[this.indexPostagens].midia;
    (<HTMLHeadingElement>carrosselItem.children[1].children[0]).innerText = this.postagensFiltradas[this.indexPostagens].animal.nomeAnimal;
    (<HTMLParagraphElement>carrosselItem.children[1].children[1]).innerText = "TAM: " + this.postagensFiltradas[this.indexPostagens].animal.tamanhoAnimal +' | '+ this.postagensFiltradas[this.indexPostagens].descricao;
    
    let metadata = (<HTMLDivElement>document.querySelector('#metadata'))
    metadata.children[0].innerHTML = this.postagensFiltradas[this.indexPostagens].usuario.nomeUsuario
    metadata.children[1].innerHTML = this.postagensFiltradas[this.indexPostagens].usuario.fotoUsuario
  }

  pegarInformacoesUsuario(email: string) {
    this.usuarioService.getUsuarioByEmail(email).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  pegarPostagens() {
    
    this.postagemService.getAllPostagens().subscribe((postagens: Postagem[]) => {
      postagens.forEach(postagem => {
        if (postagem.usuario.id == this.usuario.id) {
          this.postagensUsuario.push(postagem)
        } else {
          this.postagens.push(postagem)
        }
      })
      this.filtrarPostagens()
    })
  }

  filtrarPostagens() {
  
    let filtroTipo = (<HTMLSelectElement>document.querySelector('#filtroTipo')).value
    let filtroTamanho  = (<HTMLSelectElement>document.querySelector('#filtroTamanho')).value
    let filtroIdade  = parseInt((<HTMLSelectElement>document.querySelector('#filtroIdade')).value)
    
    this.postagens.forEach(postagem => {
      
      let index = this.postagensFiltradas.findIndex(post => post.id == postagem.id)

      if ((filtroTipo == 'todos' || filtroTipo == postagem.animal.tipoAnimal) &&
          (filtroTamanho == 'todos' || filtroTamanho == postagem.animal.tamanhoAnimal) &&
          (filtroIdade == 0 || filtroIdade == postagem.animal.idadeAnimal)) {    
          
          if (index == -1) {
            this.postagensFiltradas.push(postagem)
          }

      } else {
      
          if (index > -1) {
            this.postagensFiltradas.splice(index, 1)
          }
      }
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

  mostrarChat() {
    this.conteudo = 'chat'
  }

  mostrarCarrossel() {
    this.conteudo = 'carrossel'
  }

  criarConversa() {

    let messageTab = (<HTMLDivElement>document.querySelector('#caixa-de-mensagens'))

    let metadata = (<HTMLDivElement>document.querySelector('#metadata'))
    let name = metadata.children[0].innerHTML
    let photo = metadata.children[1].innerHTML

    let card = document.createElement('div')
    card.classList.add('card')
    card.classList.add('cPointer')
    card.classList.add('caixa-mensagem')
    card.style.maxWidth = '540px'
    card.style.height = '12.5vh'

    let row = document.createElement('div')
    row.classList.add('row')
    row.classList.add('h-100')
    row.classList.add('g-0')
    card.appendChild(row)

    let imageContainer = document.createElement('div')
    imageContainer.classList.add('col-md-3')
    imageContainer.classList.add('pr-1')
    imageContainer.classList.add('d-flex')
    imageContainer.classList.add('justify-content-center')
    imageContainer.classList.add('align-items-center')
    row.appendChild(imageContainer)

    let image = document.createElement('img')
    image.classList.add('rounded-circle')
    image.width = 64
    image.height = 64
    image.alt = 'Foto usuário'
    image.src = photo
    imageContainer.appendChild(image)

    let bodyContainer = document.createElement('div')
    bodyContainer.classList.add('col-md-9')
    bodyContainer.classList.add('pl-1')
    row.appendChild(bodyContainer)

    let cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    cardBody.classList.add('h-100')
    cardBody.classList.add('p-0')
    cardBody.classList.add('d-flex')
    cardBody.classList.add('flex-column')
    cardBody.classList.add('justify-content-between')
    bodyContainer.appendChild(cardBody)

    let cardTitle = document.createElement('h5')
    cardTitle.classList.add('card-title')
    cardTitle.classList.add('mb-0')
    cardTitle.innerHTML = name
    cardBody.appendChild(cardTitle)

    let messagePreview = document.createElement('p')
    messagePreview.classList.add('card-text')
    messagePreview.classList.add('mb-0')
    messagePreview.classList.add('fs-1')
    messagePreview.style.height = '25px'
    messagePreview.style.overflow = 'hidden'
    messagePreview.innerHTML = 'Inicie uma conversa com ' + name
    cardBody.appendChild(messagePreview)

    let cardFooter = document.createElement('p')
    cardFooter.classList.add('card-text')
    cardBody.appendChild(cardFooter)

    let lastMessage = document.createElement('small')
    lastMessage.classList.add('text-muted')
    lastMessage.innerHTML = 'Esta conversa não possui mensagens'
    cardFooter.appendChild(lastMessage)

    messageTab.appendChild(card)

    this.promover()
  }
}

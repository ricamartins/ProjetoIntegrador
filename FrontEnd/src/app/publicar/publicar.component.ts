import { Component, OnInit } from '@angular/core';
import { Animal } from '../model/Animal';
import { Postagem } from '../model/Postagem';
import { MidiaService } from '../service/midia.service';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.css']
})
export class PublicarComponent implements OnInit {

  postagem: Postagem = new Postagem()
  animal: Animal = new Animal()

  constructor(private midiaService: MidiaService) { }

  ngOnInit(): void {
  }

  publicar() {
    
  }
}

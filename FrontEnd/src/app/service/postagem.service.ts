import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from '../model/Animal';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')!)
  }

  publicarAnimal(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>("http://localhost:8080/animal", animal, this.token)
  }

  publicarPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>("http://localhost:8080/postagem", postagem, this.token)
  }

  getAllPostagens(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>("http://localhost:8080/postagem", this.token)
  }
}

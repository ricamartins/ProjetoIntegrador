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
    return this.http.post<Animal>("https://match-pet.herokuapp.com/animal", animal, this.token)
  }

  editarAnimal(animal: Animal): Observable<Animal> {
    return this.http.put<Animal>("https://match-pet.herokuapp.com/animal", animal, this.token)
  }
  
  deleteAnimal(id: number) {
    return this.http.delete(`https://match-pet.herokuapp.com/id/${id}`, this.token)
  }

  publicarPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>("https://match-pet.herokuapp.com/postagem", postagem, this.token)
  }

  getAllPostagens(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>("https://match-pet.herokuapp.com/postagem", this.token)
  }

  getPostagemById(id: number): Observable<Postagem> {
    return this.http.get<Postagem>(`https://match-pet.herokuapp.com/postagem/id/${id}`, this.token)
  }

  editarPostagem(postagem: Postagem) {
    return this.http.put<Postagem>(`https://match-pet.herokuapp.com/postagem`, postagem, this.token)
  }

  deletePostagem(id: number) {
    return this.http.delete(`https://match-pet.herokuapp.com/postagem/id/${id}`, this.token)
  }

}

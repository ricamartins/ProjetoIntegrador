import { Observable } from 'rxjs';
import { Usuario } from './../model/Usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token ={ 
    headers : new HttpHeaders().set('Authorization', localStorage.getItem('token')!) 
  }
  constructor(private http: HttpClient) {}

  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`https://match-pet.herokuapp.com/usuario/id/${id}`,this.token);
  }

  getUsuarioByEmail(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(`https://match-pet.herokuapp.com/usuario/email/${email}`,this.token);
  }

  editarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>("https://match-pet.herokuapp.com/usuario", usuario, this.token)
  }
}

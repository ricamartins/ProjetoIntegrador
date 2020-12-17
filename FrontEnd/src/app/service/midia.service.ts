import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MidiaService {

  CLOUDINARY_UPLOAD_PRESET = 'ocygho5p'

  constructor(private http: HttpClient) {}

  uploadPhoto(file: File): Observable<any> {

    let data: FormData = new FormData()
    data.append('file', file)
    data.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET)
    data.append('cloud_name', 'ricamartins')

    return this.http.post('https://api.cloudinary.com/v1_1/ricamartins/image/upload', data)
  }

  carregarImagemPreview(imagem: File) {
    let url = URL.createObjectURL(imagem);
    (<HTMLImageElement>document.querySelector('img#imagem-preview'))!.src = url
    return imagem
  }
}

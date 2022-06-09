import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'X4ZYpAkPEECBg4H7hOMdPNF7z7K4GIw1';
  private servicioUrl: string = 'http://api.giphy.com/v1/gifs'
  private _historia: string[] = [];
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historia];
  }

  constructor(private http: HttpClient) {
    // if(localStorage.getItem('historial')){
    //   this._historia = JSON.parse(localStorage.getItem('historial')!);
    // }
    this._historia = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  };

  buscarGifs( query: string){
    query = query.trim().toLocaleLowerCase();

    if(!this._historia.includes(query)){
      this._historia.unshift(query);
      this._historia = this._historia.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historia));

    }
    
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '9')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe( (resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      });
  }

}

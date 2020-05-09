import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headLinesPage = 0;

  idioma = 'us';

  categoriaActual = '';
  categoriaPage = 0;


  constructor( private http: HttpClient ) { }

private ejecutarQuery<T>(query: string) {

  query = apiUrl + query;

  return this.http.get<T>(query, { headers });

}

getTopHeadLines(idioma: string) {
  // console.log('Desde el servicio', this.idioma, 'Idioma que llega:', idioma);

  if (this.headLinesPage > 0) {
    this.headLinesPage = 1;
  } else {
    this.headLinesPage ++;
  }

  return this.ejecutarQuery<RespuestaTopHeadlines>
  (`/top-headlines?country=${ idioma }&page=${ this.headLinesPage }`);
  // return this.http.get<RespuestaTopHeadlines>
  // (`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0b13423008f14d54a0008af56486234f`);
}

getTopHeadlinesCategoria(categoria: string, idioma: string) {

  if ( this.categoriaActual === categoria) {
    this.categoriaPage++;
  } else {
    this.categoriaPage = 1;
    this.categoriaActual = categoria;
  }

  return this.ejecutarQuery<RespuestaTopHeadlines>
(`/top-headlines?country=${ idioma }&category=${ categoria }&page=${ this.categoriaPage }`);

// return this.http.get<RespuestaTopHeadlines>
  // (`https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=0b13423008f14d54a0008af56486234f`);
}


}

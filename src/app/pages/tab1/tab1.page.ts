import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.cargarNoticias(this.noticiasService.idioma);
  }

  loadData(event) {
    // console.log( event );
    this.cargarNoticias(this.noticiasService.idioma, event);
  }

  cargarNoticias(idioma: string, event?) {
    this.noticias = [];
    this.noticiasService.getTopHeadLines(idioma).subscribe((resp) => {
      // console.log('noticias', resp);

      /* if ( resp.articles.length === 0 ) {
      event.target.disabled = true;
      return;
       event.target.complete();

    } */
      // this.noticias = resp.articles;
      this.noticias.push(...resp.articles);

      if (event) {
        event.target.complete();
        event.target.disabled = true;
      }
      return;

      /* if (event) {
      event.target.disabled = true;
    } */
    });
  }

  onClick(iniciales: string) {
    // this.idioma = iniciales;
    // console.log(this.noticiasService.idioma);
    this.noticiasService.idioma = iniciales;
    // console.log(iniciales, this.noticiasService.idioma);
    this.cargarNoticias(this.noticiasService.idioma);
  }
}

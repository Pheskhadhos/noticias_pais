import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, {static: true}) segment: IonSegment;

  categorias = [
    'business', 'entertainment', 'general',
     'health', 'science', 'sports', 'technology'
  ];

  noticias: Article [] = [];

  constructor( private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.segment.value, this.noticiasService.idioma);
    // console.log(this.noticiasService.idioma);
  }

  cambioCategoria( event ) {
    this.noticias = [];
    this.cargarNoticias( event.detail.value, this.noticiasService.idioma );
  }

  cargarNoticias(categoria: string, idioma: string, event? ) {
    // console.log('Desde TAB2', idioma, this.noticiasService.idioma);
    this.noticias = [];
    this.noticiasService.getTopHeadlinesCategoria( categoria , this.noticiasService.idioma)
    .subscribe( resp => {
      // console.log( resp );
      this.noticias.push(...resp.articles);

      if ( event ) {
        event.target.complete();
      }

    });
  }

  ionViewWillEnter() {
    this.cargarNoticias(this.segment.value, this.noticiasService.idioma);
  }

  loadData(event) {
    this.cargarNoticias(this.segment.value, this.noticiasService.idioma, event );
  }

}

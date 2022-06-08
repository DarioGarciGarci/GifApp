import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private gifsservice: GifsService) { }

  ngOnInit(): void {
  }

  get hisotiralBusqueda() {
    return this.gifsservice.historial;
  }

  buscar(titulo: string){
    this.gifsservice.buscarGifs(titulo);
  }

}

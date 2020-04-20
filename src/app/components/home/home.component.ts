import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public titulo: string;

  constructor() {
    this.titulo = 'Webapp de productos con angular 4';
   }

  ngOnInit() {
  }

}

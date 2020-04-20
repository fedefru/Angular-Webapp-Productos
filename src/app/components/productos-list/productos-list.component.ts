import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoService } from '../../services/producto.service';
import { Producto } from 'src/app/models/producto';
import { removeSummaryDuplicates } from '@angular/compiler';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.scss'],
  providers: [ProductoService]
})
export class ProductosListComponent implements OnInit {

  public titulo: string;
  public productos: Producto[];
  public confirm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) { 
    this.titulo = 'Listado de Productos';
    this.confirm = null;
  }

  ngOnInit() {
    this.getProductos();
  }

  onDeleteProducto(id){
    this.productoService.deleteProducto(id).subscribe(
      response => {
        if(response.code == 200){
          this.getProductos();
        }else{
          alert('Error al borrar producto');
        }
      }, error => {
        console.log(<any>error);
      }
    );
  }

  getProductos(){
    this.productoService.getProducto().subscribe(
      result =>{
        if(result.code != 200){
          console.log(result);
        }else{
          this.productos = result.data;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  borrarConfirm(id){
    this.confirm = id;

  }

  cancelConfirm(){
    this.confirm = null;
  }

}

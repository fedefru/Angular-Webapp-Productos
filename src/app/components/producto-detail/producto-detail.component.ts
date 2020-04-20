import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoService } from '../../services/producto.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.scss'],
  providers: [ProductoService]
})
export class ProductoDetailComponent implements OnInit {

  public titulo:string;
  public producto: Producto;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) { 
    this.titulo = 'Detalles del producto';
    
  }

  ngOnInit() {
    this.getProducto();
  }

  getProducto(){
    this.route.params.forEach((params: Params) => {
      let id = params ['id'];
      
      this.productoService.getProduct(id).subscribe(
        response =>{
          if(response.code == 200){
            this.producto = response.data;
          }else{
            this.router.navigate(['/productos']);
          }

        },
        error =>{
          console.log(<any>error);
        }
      );


    });
  }
  
}

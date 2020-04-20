import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoService } from '../../services/producto.service';
import { Producto } from 'src/app/models/producto';
import { GLOBAL } from 'src/app/services/global.service';
import {ProductoAddComponent} from '../producto-add/producto-add.component';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.scss'],
  providers: [ProductoService]
})
export class ProductoEditComponent implements OnInit {

  public titulo:string;
  public producto: Producto;
  public isEdit;
  public filesToUpload;
  public resultLoad;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService) {
      this.titulo = 'Editar Producto';
      this.producto = new Producto(1,'','',0,'');
      this.isEdit = true;
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

  onSubmit(){
    
    if(this.filesToUpload && this.filesToUpload.length >= 1){

      this.productoService.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload)
      .then((result) => {
          this.resultLoad = result;
          this.producto.imagen = this.resultLoad.filename;
          this.updateProducto();

          }, (error) =>{

          console.log(<any>error);
      });

    }else{

      this.updateProducto();

    }
  }

  updateProducto(){
    this.route.params.forEach((params: Params) => {
      let id = params ['id'];
            this.productoService.editProducto(id, this.producto).subscribe(
              response =>{
                this.router.navigate(['/producto/', id]);
                console.log(response);
              },
              error => {
                console.log(<any>error);
              }
           );
      });
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

  

}

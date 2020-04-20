import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { GLOBAL } from 'src/app/services/global.service';


@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.component.html',
  styleUrls: ['./producto-add.component.scss'],
  providers: [ProductoService]
})
export class ProductoAddComponent implements OnInit {

  public titulo:string;
  public producto: Producto;
  public filesToUpload;
  public resultLoad;

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router 
    ) {

    this.titulo = 'Crear un nuevo producto';
    this.producto = new Producto(10,'','',0,'');
    
   }

  ngOnInit() {
  }

  onSubmit(){
    console.log('producto->',this.producto);
    console.log('files->', this.filesToUpload);
    if(this.filesToUpload && this.filesToUpload.length >= 1){

      this.productoService.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload)
      .then((result) => {
          this.resultLoad = result;
          this.producto.imagen = this.resultLoad.filename;
          this.saveProducto();

          }, (error) =>{

          console.log(<any>error);
      });

    }else{

      this.saveProducto();

    }
  }

  saveProducto(){
    this.productoService.addProducto(this.producto).subscribe(
      response =>{
        this.router.navigate(['/productos']);
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
  );
  }

  fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
      console.log(this.filesToUpload);
  }

}

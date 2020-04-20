import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Producto } from '../models/producto';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url: string;
  

  constructor( private http:HttpClient ) { 
    this.url =  GLOBAL.url;
  }

  getProducto(): Observable<any>{
    return this.http.get(this.url+'productos');
  }

  getProduct(id): Observable<any>{
    return this.http.get(this.url+'producto/'+id);
  }

  addProducto(producto: Producto){
    let json = JSON.stringify(producto);
    let params = 'json='+json;

    return this.http.post( this.url+'productos', params ,
     {headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})}

  );
  }

  makeFileRequest(url:string, params:Array<string>, files:Array<File>){
    return new Promise((resolve, reject) =>{
        var formData: any = new FormData();
        var xht = new XMLHttpRequest();
      
        for(var i = 0; i < files.length; i++){
          console.log('undeque?!'+files[i].name);
          formData.append('uploads[]',files[i], files[i].name);
        }

        xht.onreadystatechange = function(){
          if(xht.readyState == 4){
            if(xht.status == 200){
              resolve(JSON.parse(xht.response));
            }else{
              reject(xht.response);
            }
          }
        };

        xht.open("POST", url, true);
        xht.send(formData);
    });
  
  
  
  }

  editProducto(id, producto:Producto){
    let json = JSON.stringify(producto);
    let params = 'json='+json;

    
    return this.http.post( this.url+'update-producto/'+id, params ,
     {headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})}

  );
  }
  
  deleteProducto(id): Observable<any>{
  return this.http.get(this.url+'delete-producto/'+id);
  
  }


}

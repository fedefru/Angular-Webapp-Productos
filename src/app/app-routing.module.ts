import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { ProductosListComponent } from './components/productos-list/productos-list.component';
import { ProductoAddComponent } from './components/producto-add/producto-add.component';
import { ProductoDetailComponent } from './components/producto-detail/producto-detail.component';
import { ProductoEditComponent } from './components/producto-edit/producto-edit.component';

const routes: Routes = [{
    path:'', component:HomeComponent  
  },{
    path:'home', component:HomeComponent  
  },{
    path:'productos', component:ProductosListComponent  
  },{
    path:'productos-add', component:ProductoAddComponent  
  },{
    path:'producto/:id', component:ProductoDetailComponent  
  },{
    path:'editar-producto/:id', component:ProductoEditComponent  
  },{
    path:'**', component: ErrorComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
export var GLOBAL = {
  url:'http://localhost/curso-angular4-backend/index.php/',
  header_color: '#E03137'
};

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  
  constructor() { }
}

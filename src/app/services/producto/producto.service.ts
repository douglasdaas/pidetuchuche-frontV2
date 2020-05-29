import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from '../global';
import { Producto } from '../../models/producto';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  public url:string;
  constructor(
    public _http: HttpClient
  ) { 
    this.url = GLOBAL.url;
  }
  pruebas(){
    return "Hola Mundo";
  }
  // Obtener todos los productos 
  getProductos(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.get(this.url + '/productos',{ headers: headers});

  }
  // Obtener productos de una categoria
  getProductosByCategory(id): Observable<any> {
    return this._http.get(this.url + '/productos'+ id );
  }

  createProduct(token, producto:Producto){
    let json = JSON.stringify(producto);

    let params =json;
    let headers = new HttpHeaders().set('Content-Type', 'Application/json')
                                   .set('Authorization', token);

    return this._http.post(this.url+'/productos' , params, { headers: headers});
 
  }

}

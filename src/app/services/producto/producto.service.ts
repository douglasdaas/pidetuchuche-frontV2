import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  public url: string;
  constructor(
    // tslint:disable-next-line:variable-name
    public _http: HttpClient
  ) {

  this.url = GLOBAL.urlTest;

  }

  pruebas() {
    return 'Hola Mundo';
  }

  // Obtener todos los productos
  getProductos(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // const params = new HttpParams().set('params',page);
    return this._http.get(this.url + '/productos', { headers: headers});

  }

  // Obtener los productos del Slider Principal
  getSliderPrincipal(): Observable<any> {
    return this._http.get(this.url + '/productos-principal')
  }

  // Obtener productos de una categoria
  getProductosByCategory(id): Observable<any> {
    return this._http.get(this.url + '/productos' + id );
  }


  // Crear un producto
  createProduct(token, producto) {
    const headers = new HttpHeaders().set('Authorization', token);

    return this._http.post(this.url + '/productos' , producto, { headers: headers});

  }

  // Editar un producto
  editProduct(token, id, data) {
    const headers = new HttpHeaders().set('Authorization', token);

    return this._http.patch(this.url + '/productos/' + id, data, {headers: headers});
  }

  // Vender Producto
  sellProduct(token, id ,producto){
    const headers = new HttpHeaders().set('Authorization', token);

    return this._http.post(this.url + '/productos/venta/' + id , producto, { headers: headers});

  }

  // Borrar un producto
  deleteProduct(token, producto) {
    const headers = new HttpHeaders().set('Authorization', token);

    return this._http.delete(this.url + '/productos/' + producto.id , {headers: headers});
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL} from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  public url:string;
constructor(
  public _http:HttpClient
) {
  this.url = GLOBAL.urlTest;
}

//Obtener todas las categorias
getCategorias():Observable<any>{
  let headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this._http.get(this.url + '/categorias',{ headers: headers});
}

}

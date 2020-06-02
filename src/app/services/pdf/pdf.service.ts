import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from '../global';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  public url:string;
constructor(
  public _http: HttpClient
) { 
  this.url = GLOBAL.url;
}

    // Obtener URL del PDF
    getPDFURL(): Observable<any>{
      return this._http.get(this.url + '/miselaneos/1');
    }
  
    // Editar el PDF
    editPDF(token, PDF){
      const headers = new HttpHeaders().set('Authorization', token);
  
      return this._http.patch(this.url + '/miselaneos/1', PDF, {headers});
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;
  public user: User;
  public token;
  constructor(
    public _http: HttpClient
  ) {
    this.url = GLOBAL.urlTest;
  }

  signup( user): Observable<any> {
    let json = JSON.stringify({
      "email": user.email,
      "password": user.password
    });
    let params =json;
    let headers = new HttpHeaders().set('Content-Type', 'Application/json');

    return this._http.post(this.url+'/login' , params, { headers: headers});
  }

  // Obtener del Local Storage el token del usuario
  getToken(){
    let token = localStorage.getItem('token');

    if(token != "undefined"){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }
}

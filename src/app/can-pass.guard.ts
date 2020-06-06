import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CanPassGuard implements CanLoad {
  

  constructor(private _userService: UserService, private router: Router) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      let url: string = route.path;
      console.log('Url:'+ url);
      if (this._userService.getToken()){
        return true;
      }else{
        this.router.navigate(['login']);
        return false;
      }
  }
}

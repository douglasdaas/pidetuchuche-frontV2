import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ UserService ]  
})
export class LoginComponent implements OnInit {
  public user: User;
  public status;
  public token;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) { 
    this.user = new User('','',null,null);
  }

  ngOnInit() {

  }
  onSubmit(form){
    console.log(this.user);

    this._userService.signup(this.user).subscribe(
      response =>{
        console.log(response.status);
        this.status = 'success';
        //Guarda el Token en el local Storage
        this.token = 'Bearer ' + response.data.token;
        localStorage.setItem('token', this.token);
        this._router.navigate(['admin']);
        console.log(response);
      },
      error => {
        this.status='error'
        console.log(<any>error);
      }
    );
  }
}

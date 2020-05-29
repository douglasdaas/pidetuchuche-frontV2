import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as AOS from 'aos';
import { Categoria } from 'src/app/models/categoria';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers: [ ProductoService, UserService ]
})
export class ProductoComponent implements OnInit {

  @Input() productos: Array<Producto>;
  @Input() categorias: Array<Categoria>;
  public token;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productoService: ProductoService,
    private _userService: UserService
  ) { }

  ngOnInit() {
    AOS.init();
    AOS.refresh();
    this.token = this._userService.getToken();
    console.log( this._productoService.pruebas());
    
  }


  getProduct(){
    
  }

}

import { Component, OnInit,Input } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { HttpClient } from '@angular/common/http';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ViewEncapsulation } from '@angular/core';




@Component({
  selector: 'app-sliderPrincipal',
  templateUrl: './sliderPrincipal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./sliderPrincipal.component.css'],
})
export class SliderPrincipalComponent implements OnInit {
  @Input() productos: Array<Producto>;
  public token: any;

  constructor(
    private _http: HttpClient,
    private _productoService: ProductoService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _config: NgbCarouselConfig
  ) { }

  ngOnInit() {

    this.token = this._userService.getToken();
    //this.getSliderPrincipal();
    //this.showSlider();

  }

  transformImage(producto) {
    const ruta = producto.ruta_imagen;
    const quality = '/q_auto:eco';
    const position = ruta.indexOf('/v');
    return [ruta.slice(0, position), quality, ruta.slice(position)].join('');
  }

  getSliderPrincipal(){
    this._productoService.getSliderPrincipal().subscribe(
      response =>{
        console.log(response);
        if (response.status = 'Lista de todos los productos Principales, hay 3 productos principales' ){
          this.productos = response.datos
          console.log(this.productos);
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
  }

  //Cambiar mas adelante
  showSlider(){
    const principalContainer = document.getElementById("principalContainer");
    if (this.productos){

      this.productos.forEach( producto =>{
        let div = document.createElement("div");
        div.classList.add("carousel-item");

        if (producto.categorias.length > 0) {
          if (producto.descuento === null) {
            div.innerHTML ='<div class="principal-product"><div class="principal-card card-1"><div class="principal-text"><h1>' +producto.nombre +"</h1><h2>Precio</h2><h3>" +producto.precio_total +"$</h3><h4>Stock:" +producto.cantidad +"</h4><p>" +producto.description +'</p><div><button data-toggle="modal" data-target="#buyInfo" type="button" name="button">Compra</button><button class="buttonUpdate" style="display:none"  data-toggle="modal" data-target="#editProduct" type="button" name="button">editar</button></div></div><img class="img-fluid img-principal" src="' +producto.ruta_imagen +'" alt=""></div></div>';
          } else {
            div.innerHTML ='<div class="principal-product"><div class="principal-card card-1"><div class="principal-text"><h1>' +producto.nombre +"</h1><h2>Precio</h2><h3>" +producto.precio_total +"$</h3><h4>Stock:" +producto.cantidad +"</h4><p>" +producto.description +'</p><div><button data-toggle="modal" data-target="#buyInfo" type="button" name="button">Compra</button><button class="buttonUpdate" style="display:none"  data-toggle="modal" data-target="#editProduct" type="button" name="button">editar</button></div></div><img class="img-fluid img-principal" src="' +producto.ruta_imagen +'" alt=""></div></div>';
            // div.innerHTML = '<div class="principal-product"><div class="principal-card card-1"><div class="principal-text"><h1>'+producto.nombre+'</h1><h2>Precio</h2><h3>'+producto.precio_total+'$</h3><h4>Stock: 32</h4><p>Gomita Fini + Oreo + Pringle + Milka + Chips Ahoy</p><div><button data-toggle="modal" data-target="#buyInfo" type="button" name="button">Compra</button><button class="buttonUpdate" style="display:none"  data-toggle="modal" data-target="#editProduct" type="button" name="button">editar</button><button class="buttonDelete" style="display:none" type="button" name="button">borrar</button></div></div><img class="img-fluid img-principal" src="' + producto.ruta_imagen +  '" alt=""></div></div>';
          }
        } else {
          if (producto.descuento === null) {
            div.innerHTML ='<div class="principal-product"><div class="principal-card card-1"><div class="principal-text"><h1>' +producto.nombre +"</h1><h2>Precio</h2><h3>" +producto.precio_total +"$</h3><h4>Stock:" +producto.cantidad +"</h4><p>" +producto.description +'</p><div><button data-toggle="modal" data-target="#buyInfo" type="button" name="button">Compra</button><button class="buttonUpdate" style="display:none"  data-toggle="modal" data-target="#editProduct" type="button" name="button">editar</button></div></div><img class="img-fluid img-principal" src="' +producto.ruta_imagen +'" alt=""></div></div>';

            // div.innerHTML = '<div class="principal-product"><div class="principal-card card-1"><div class="principal-text"><h1>'+producto.nombre+'</h1><h2>Precio</h2><h3>'+producto.precio_total+'$</h3><h4>Stock: 32</h4><p>Gomita Fini + Oreo + Pringle + Milka + Chips Ahoy</p><div><button data-toggle="modal" data-target="#buyInfo" type="button" name="button">Compra</button><button class="buttonUpdate" style="display:none"  data-toggle="modal" data-target="#editProduct" type="button" name="button">editar</button><button class="buttonDelete" style="display:none" type="button" name="button">borrar</button></div></div><img class="img-fluid img-principal" src="' + producto.ruta_imagen +  '" alt=""></div></div>';
          } else {
            div.innerHTML ='<div class="principal-product"><div class="principal-card card-1"><div class="principal-text"><h1>' +producto.nombre +"</h1><h2>Precio</h2><h3>" +producto.precio_total +"$</h3><h4>Stock:" +producto.cantidad +"</h4><p>" +producto.description +'</p><div><button data-toggle="modal" data-target="#buyInfo" type="button" name="button">Compra</button><button class="buttonUpdate" style="display:none"  data-toggle="modal" data-target="#editProduct" type="button" name="button">editar</button></div></div><img class="img-fluid img-principal" src="' +producto.ruta_imagen +'" alt=""></div></div>';

            // div.innerHTML = '<div class="principal-product"><div class="principal-card card-1"><div class="principal-text"><h1>'+producto.nombre+'</h1><h2>Precio</h2><h3>'+producto.precio_total+'$</h3><h4>Stock: 32</h4><p>Gomita Fini + Oreo + Pringle + Milka + Chips Ahoy</p><div><button data-toggle="modal" data-target="#buyInfo" type="button" name="button">Compra</button><button class="buttonUpdate" style="display:none"  data-toggle="modal" data-target="#editProduct" type="button" name="button">editar</button><button class="buttonDelete" style="display:none" type="button" name="button">borrar</button></div></div><img class="img-fluid img-principal" src="' + producto.ruta_imagen +  '" alt=""></div></div>';
          }
        }
        principalContainer.appendChild(div);
      });
    }
  }
}

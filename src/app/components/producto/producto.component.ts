import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto/producto.service';
import { ActivatedRoute, Router, Event } from '@angular/router';
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
  @Output() public shouldEdit = new EventEmitter<any>();
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



  fillUpdate(producto){
    console.log(producto)
    let nombre = document.getElementById('inputV1') as HTMLInputElement;
    let descripcion = document.getElementById('inputV2') as HTMLInputElement;
    let cantidad = document.getElementById('inputV3') as HTMLInputElement;
    let prioridad = document.getElementById('inputV4') as HTMLInputElement;
    let precio = document.getElementById('inputV5') as HTMLInputElement;
    let descuento = document.getElementById('inputV6') as HTMLInputElement;

    nombre.value = producto.nombre;
    descripcion.value = producto.descripcion;
    cantidad.value = String(producto.cantidad);
    prioridad.value = String(producto.prioridad);
    precio.value = String(producto.precio);
    descuento.value = String(producto.descuento);

    for (var k=0; k <= 4; k++) {
      let categorias = document.getElementById(`categoriaV${[k]}`) as HTMLInputElement;
      categorias.checked = false;
      console.log(`Limpiando Todas las Categorias, ${[k]} limpiezas`)
    }

    if (producto.categorias.length > 0) {
      for (var i=0; i < producto.categorias.length; i++) {  //<---- Ciclo Recorre Categorias
        for (var j=0; j <= 4; j++) {  //<---- Ciclo Recorre Checkboxes
          let categoria = document.getElementById(`categoriaV${[j]}`) as HTMLInputElement;
            if (producto.categorias[i].nombre == categoria.value ){
              categoria.checked = true;
              console.log('Agregando categoria :: ', categoria.value)
            }
        }
      }
    }

    this.shouldEdit.emit(
      producto.id
    );
  }

  editProduct(producto){
    let nombre = document.getElementById('inputV1') as HTMLInputElement;
    let descripcion = document.getElementById('inputV2') as HTMLInputElement;
    let cantidad = document.getElementById('inputV3') as HTMLInputElement;
    let prioridad = document.getElementById('inputV4') as HTMLInputElement;
    let precio = document.getElementById('inputV5') as HTMLInputElement;
    let descuento = document.getElementById('inputV6') as HTMLInputElement;

    let product_category = [];
    // Se agregan las categorias al request
    for (var i = 0; i <= 4; i++) {
      let categoria = document.getElementById(`categoriaV${i}`) as HTMLInputElement;
      if (categoria.checked === true) {
        product_category.push(categoria.value);
      }
    }

    //Se agrega la imagen si existe en el request
    const productData = new FormData();
    if ( $('#inputVIMG').prop("files")[0] !== undefined ){
      productData.append("imagen", $('#inputVIMG').prop("files")[0]);
    };

    productData.append("id", String(producto.id));
    productData.append("nombre", String(nombre));
    productData.append("descripcion", String(descripcion));
    productData.append("cantidad", String(cantidad));
    productData.append("prioridad", String(prioridad));
    productData.append("precio", String(precio));
    productData.append("descuento", String(descuento));

    this._productoService.createProduct(this.token,productData).subscribe(
      response =>{
        console.log(response);
        alert('Producto modificado');
        AOS.refresh();
      },
      error =>{
        alert('Error')
        console.log(<any>error);
      }
    );
  }
  
  deleteProduct(producto){
    let opcion = confirm("Clicka en Aceptar o Cancelar");
    console.log(producto.id);
    if(opcion == true){
      this._productoService.deleteProduct(this.token,producto.id).subscribe(
        response =>{
          console.log(response);
          alert('Producto eliminado');
          AOS.refresh();
        },
        error => {
          console.log(<any>error);
          alert('Error vuelva a iniciar sesion ');
        }
      )
    }
  }
}

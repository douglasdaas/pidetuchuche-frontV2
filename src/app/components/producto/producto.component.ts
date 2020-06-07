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
    // tslint:disable-next-line:variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private _router: Router,
    // tslint:disable-next-line:variable-name
    private _productoService: ProductoService,
    // tslint:disable-next-line:variable-name
    private _userService: UserService
  ) { }

  ngOnInit() {
    AOS.init();
    AOS.refresh();

    if (this._userService.getToken()) {
      this.token = this._userService.getToken();
    }
    // console.log( this._productoService.pruebas());

  }



  fillUpdate(producto) {
    console.log(producto);
    const nombre = document.getElementById('inputV1') as HTMLInputElement;
    const descripcion = document.getElementById('inputV2') as HTMLInputElement;
    const cantidad = document.getElementById('inputV3') as HTMLInputElement;
    const prioridad = document.getElementById('inputV4') as HTMLInputElement;
    const precio = document.getElementById('inputV5') as HTMLInputElement;
    const descuento = document.getElementById('inputV6') as HTMLInputElement;

    nombre.value = producto.nombre;
    descripcion.value = producto.descripcion;
    cantidad.value = String(producto.cantidad);
    prioridad.value = String(producto.prioridad);
    precio.value = String(producto.precio);
    descuento.value = String(producto.descuento);

    for (let k = 0; k <= 4; k++) {
      const categorias = document.getElementById(`categoriaV${[k]}`) as HTMLInputElement;
      categorias.checked = false;
      console.log(`Limpiando Todas las Categorias, ${[k]} limpiezas`);
    }

    if (producto.categorias.length > 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < producto.categorias.length; i++) {  // <---- Ciclo Recorre Categorias
        for (let j = 0; j <= 4; j++) {  // <---- Ciclo Recorre Checkboxes
          const categoria = document.getElementById(`categoriaV${[j]}`) as HTMLInputElement;
          if (producto.categorias[i].nombre === categoria.value ) {
              categoria.checked = true;
              console.log('Agregando categoria :: ', categoria.value);
            }
        }
      }
    }

    this.shouldEdit.emit(
      producto.id
    );
  }

  editProduct(producto) {
    const nombre = document.getElementById('inputV1') as HTMLInputElement;
    const descripcion = document.getElementById('inputV2') as HTMLInputElement;
    const cantidad = document.getElementById('inputV3') as HTMLInputElement;
    const prioridad = document.getElementById('inputV4') as HTMLInputElement;
    const precio = document.getElementById('inputV5') as HTMLInputElement;
    const descuento = document.getElementById('inputV6') as HTMLInputElement;

    // tslint:disable-next-line:variable-name
    const product_category = [];
    // Se agregan las categorias al request
    for (let i = 0; i <= 4; i++) {
      const categoria = document.getElementById(`categoriaV${i}`) as HTMLInputElement;
      if (categoria.checked === true) {
        product_category.push(categoria.value);
      }
    }

    // Se agrega la imagen si existe en el request
    const productData = new FormData();
    if ( $('#inputVIMG').prop('files')[0] !== undefined ) {
      productData.append('imagen', $('#inputVIMG').prop('files')[0]);
    }

    productData.append('id', String(producto.id));
    productData.append('nombre', String(nombre));
    productData.append('descripcion', String(descripcion));
    productData.append('cantidad', String(cantidad));
    productData.append('prioridad', String(prioridad));
    productData.append('precio', String(precio));
    productData.append('descuento', String(descuento));

    this._productoService.editProduct(this.token, producto.id , productData).subscribe(
      response => {
        console.log(response);
        alert('Producto modificado');
        AOS.refresh();
      },
      error => {
        alert('Error');
        console.log(error as any);
      }
    );
  }

  deleteProduct(producto) {
    const opcion = confirm('Clicka en Aceptar o Cancelar');
    console.log(producto.id);
    if (opcion === true) {
      this._productoService.deleteProduct(this.token, producto).subscribe(
        response => {
          console.log(response);
          alert('Producto eliminado');
          AOS.refresh();
        },
        error => {
          console.log(error as any);
          alert('Error vuelva a iniciar sesion ');
        }
      );
    }
  }

  transformImage(producto) {
    const ruta = producto.ruta_imagen;
    const quality = '/q_auto:eco';
    const position = ruta.indexOf('/v');
    return [ruta.slice(0, position), quality, ruta.slice(position)].join('');
  }

}

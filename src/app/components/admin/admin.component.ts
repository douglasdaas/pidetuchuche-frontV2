import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { UserService } from 'src/app/services/user/user.service';
import { ProductoService } from '../../services/producto/producto.service';
import { ActivatedRoute, Router} from '@angular/router';
import * as AOS from 'aos';
import { PdfService } from 'src/app/services/pdf/pdf.service';
import { pdf } from 'src/app/models/pdf';
import { Categoria } from 'src/app/models/categoria';
declare var $: any;
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [ UserService, ProductoService, PdfService ]
})
export class AdminComponent implements OnInit {
  public productos: Array<Producto>;
  public producto: Producto;
  public categorias: Array<Categoria>;
  public filterProducts: Array<Producto>;
  public sliderProducts: Array<Producto>;
  public sliderProductsByCategory: Array<Producto>;
  public shouldFiltSlider: boolean;
  public token;
  public pdf: pdf;
  public idProducto: number;

  constructor(
    // tslint:disable-next-line:variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private _router: Router,
    // tslint:disable-next-line:variable-name
    private _productoService: ProductoService,
    // tslint:disable-next-line:variable-name
    private _userService: UserService,
    // tslint:disable-next-line:variable-name
    private _pdfService: PdfService
  ) {
      this.producto = new Producto(1, '', undefined, '', 0, 1, 0, 0, 0, null, null, null, false, false, false);
  }

  ngOnInit() {
    AOS.init();
    AOS.refresh();
    this.token = this._userService.getToken();
    this.getSliderPrincipal();
    this.getProducts();
    this.categorias = [
      new Categoria('combos', null, null),
      new Categoria('chocolates', null, null),
      new Categoria('dulces', null, null),
      new Categoria('salados', null, null),
      new Categoria('bebidas', null, null)];
    this.shouldFiltSlider = false;

  }

  getProducts() {
    this._productoService.getProductos().subscribe(
      response => {
        if ( response.status = true) {
          this.productos = response.datos;
        }
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }


  filterTag(nombreCategoria) {
    const filterByCategory = new Array<Producto>();
    if (nombreCategoria === 'todo') {
      this.filterProducts = this.productos;
    } else {
      this.shouldFiltSlider = true;
      this.productos.forEach(producto => {
        if ( producto.categorias.length > 0   ) {
          let agregar = false;
          producto.categorias.forEach( categoria => {
            if (categoria.nombre === nombreCategoria) {
              agregar = true;
            }
          });
          if (agregar) {
            filterByCategory.push(producto);
            agregar = false;
          }

        }
      });
      this.filterProducts = filterByCategory;
    }
    this.getSliderByCategory(nombreCategoria);
  }

  logout() {

    localStorage.removeItem('token');
    this.token = null;

    // redireccion a home
    this._router.navigate(['home']);
  }

  filterProduct(event) {
    const filterValue = event.target.value.toLowerCase();
    this.filterProducts = this.productos.filter(producto => {
      if (producto.nombre.toLowerCase().indexOf(filterValue) !== -1 ) {
        return producto;
      }
    });


  }

  // Crear nuevo Producto
  onSubmit() {
    // tslint:disable-next-line:variable-name
    const producto_principal = document.getElementById(`principal1`) as HTMLInputElement;
    const principal_categoria = document.getElementById(`principal_categoria1`) as HTMLInputElement;
    const promo_gratis = document.getElementById(`promo_gratis1`) as HTMLInputElement;

    const product_category = [];
    for (let i = 0; i <= 4; i++) {
      const categoria = document.getElementById(`categoria${[i]}`) as HTMLInputElement;
      if (categoria.checked === true) {
        product_category.push(categoria.value);
      }
    }
    const productData = new FormData();
    if ( $('#imagen').prop('files')[0] !== undefined ) {
      productData.append('imagen', $('#imagen').prop('files')[0]);
    }
    if (this.producto.descuento > 100 ) {
      this.producto.descuento = 100;
    } else if (this.producto.descuento < 0) {
      this.producto.descuento = 0;
    }
    console.log(principal_categoria.checked)
    if (principal_categoria.checked === true) {
      productData.append('principal_categoria', 'true');
    } else {
      productData.append('principal_categoria', 'false');
    }
    console.log(producto_principal.checked)
    if (producto_principal.checked === true) {
      productData.append('principal', 'true');
    }
    console.log(promo_gratis)
    if (promo_gratis.checked === true) {
      productData.append('promo_gratis', 'true');
    }

    let crear = true;
    if (this.producto.principal_categoria = true){
      if (product_category.length > 1 && product_category.length < 0){
        alert('El Producto para ser principal debe tener una y solo una categoria');
        crear = false;
      }
    }
    productData.append('nombre', this.producto.nombre);
    productData.append('descripcion', this.producto.descripcion);
    productData.append('cantidad', String(this.producto.cantidad));
    productData.append('prioridad', String(this.producto.prioridad));
    productData.append('precio', String(this.producto.precio));
    productData.append('descuento', String(this.producto.descuento));

    if (product_category.length > 0) {
      productData.append('categorias', JSON.stringify(product_category));
    }

    const producto = {};
    productData.forEach((value, key) => {
      producto[key] = value;
    });
    const productoJSON = JSON.stringify(producto);
    console.log(productoJSON);
    if (crear){
      this._productoService.createProduct(this.token, productData).subscribe(
        response => {
          console.log(response);
          alert('Producto creado');
          console.log(this.producto);
          this.clearProduct();
          console.log(this.producto);
          AOS.refresh();
        },
        error => {
          alert('Error');
          console.log(error as any);
        }
      );
      principal_categoria.checked = false;
      producto_principal.checked = false;
      promo_gratis.checked = false;
      this.getProducts();
    }

  }

  test(event) {
    console.log(this.producto);
  }

  fillUpdate(producto) {
    const nombre = document.getElementById('inputV1') as HTMLInputElement;
    const descripcion = document.getElementById('inputV2') as HTMLInputElement;
    const cantidad = document.getElementById('inputV3') as HTMLInputElement;
    const prioridad = document.getElementById('inputV4') as HTMLInputElement;
    const precio = document.getElementById('inputV5') as HTMLInputElement;
    const descuento = document.getElementById('inputV6') as HTMLInputElement;
    const principal = document.getElementById('principal') as HTMLInputElement;
    let principal_categoria = document.getElementById('principal_categoria') as HTMLInputElement;
    const promo_gratis  =  document.getElementById('promo_gratis') as HTMLInputElement;

    nombre.value = producto.nombre;
    descripcion.value = producto.descripcion;
    cantidad.value = producto.cantidad;
    prioridad.value = producto.prioridad;
    precio.value = producto.precio;
    descuento.value = producto.descuento;
    principal.value = producto.principal;
    promo_gratis.value = producto.promo_gratis;

    for (let k = 0; k <= 4; k++) {
      const categorias = document.getElementById(`categoriaV${k}`) as HTMLInputElement;
      categorias.checked = false;
    }

    if (producto.categorias.length > 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < producto.categorias.length; i++) {  // <---- Ciclo Recorre Categorias
        for (let j = 0; j <= 4; j++) {  // <---- Ciclo Recorre Checkboxes
          const categoria = document.getElementById(`categoriaV${j}`) as HTMLInputElement;
          if (producto.categorias[i].nombre === categoria.value ) {
              categoria.checked = true;
              console.log('Agregando categoria :: ', categoria.value);
          }
        }
      }
    }

    this.producto.id = producto.id;
    /*$('#editProduct').modal({
      show:'true'
    });*/
  }

  // @ts-ignore
  // @ts-ignore
  editProduct() {
    const nombre = document.getElementById('inputV1') as HTMLInputElement;
    const descripcion = document.getElementById('inputV2') as HTMLInputElement;
    const cantidad = document.getElementById('inputV3') as HTMLInputElement;
    const prioridad = document.getElementById('inputV4') as HTMLInputElement;
    const precio = document.getElementById('inputV5') as HTMLInputElement;
    const descuento = document.getElementById('inputV6') as HTMLInputElement;
    const principal = document.getElementById('principal') as HTMLInputElement;
    const promo_gratis = document.getElementById('promo_gratis') as HTMLInputElement;
    const principal_categoria = document.getElementById('principal_categoria') as HTMLInputElement;

    // tslint:disable-next-line:variable-name
    const product_category = [];
    // Se agregan las categorias al request
    for (let i = 0; i <= 4; i++) {
      const categoria = document.getElementById(`categoriaV${i}`) as HTMLInputElement;
      if (categoria.checked === true) {
        product_category.push(categoria.value);
      }
    }
    let editar = true;
    console.log(`numero de categorias ${product_category.length}`);
    if ((product_category.length === 0 || product_category.length > 1 ) && principal_categoria.checked === true) {
        alert('El Producto para ser principal de una categoria debe tener una y solo una categoria');
        editar = false;
    }

    // Se agrega la imagen si existe en el request
    const productData = new FormData();
    if ( $('#inputVIMG').prop('files')[0] !== undefined ) {
      productData.append('imagen', $('#inputVIMG').prop('files')[0]);
    }

    if (product_category.length > 0) {
      productData.append('categorias', JSON.stringify(product_category));
    }

    if (principal_categoria.checked === true){
      productData.append('principal_categoria', 'true');
    }

    if (principal.checked === true){
      productData.append('principal', 'true');
    }

    if(promo_gratis.checked === true){
      productData.append('promo_gratis', 'true');
    }

    const producto = {};
    productData.forEach((value, key) => {
      producto[key] = value;
    });
    const productoJSON = JSON.stringify(producto);
    console.log(productoJSON);

    productData.append('id', String(this.idProducto));
    productData.append('nombre', String(nombre.value));
    productData.append('descripcion', String(descripcion.value));
    productData.append('cantidad', String(cantidad.value));
    productData.append('prioridad', String(prioridad.value));
    productData.append('precio', String(precio.value));
    productData.append('descuento', String(descuento.value));

    if (editar) {
      this._productoService.editProduct(this.token, this.idProducto, productData).subscribe(
        response => {
          console.log(response);
          alert('Producto modificado');
          this.getProducts();
          AOS.refresh();
        },
        error => {
          alert('Error');
          console.log(error as any);
        }
      );
    }

  }

  shouldEdit(id) {
    this.idProducto = id;
  }

  shouldRefresh(value) {
    if(value){
      this.getProducts();
      AOS.refresh();
    }
  }

  sellProduct(producto) {
    const sellQuantity = document.getElementById(producto.id) as HTMLInputElement;
    const productData = new FormData();

    productData.append('cantidad', sellQuantity.value);

    this._productoService.sellProduct(this.token, producto.id, productData).subscribe(
      response => {
        console.log(response);
        alert(sellQuantity.value + ' Producto vendido');
        this.getProducts();
      },
      error => {
        console.log(error as any);
      }
    );

  }

  clearProduct() {
    // this.producto.id = 1;
    this.producto.nombre = '';
    this.producto.descripcion = '';
    this.producto.ruta_imagen = undefined;
    this.producto.precio = 0;
    this.producto.precio_total = 0;
    this.producto.prioridad = undefined;
    this.producto.cantidad = 0;
    this.producto.descuento = 0;

  }

  editPDF() {
    const pdfData = new FormData();

    if ( $('#pdfFile').prop('files')[0] !== undefined ) {
      pdfData.append('imagen', $('#pdfFile').prop('files')[0]);
    }

    this._pdfService.editPDF(this.token, pdfData).subscribe(
      response => {
        alert('PDF Actualizado');
      },
      error => {
        console.log(error as any);
      }
    );
  }

  showPDF() {
    window.location.replace(this.pdf.ruta);
  }

  getPDFURL() {
    this._pdfService.getPDFURL().subscribe(
      response => {
        if (response.status = true) {
          this.pdf = response.datos;
        }
        console.log(response);
      },
      error => {
        console.log( error as any);
      }
    );

    this.showPDF();
  }

  getSliderPrincipal() {
    this._productoService.getSliderPrincipal().subscribe(
      response => {
        console.log(response);
        if (response.status = true ) {
          this.sliderProducts = response.datos;
          console.log(this.sliderProducts);
        }
      },
      error => {
        console.log(error as any);
      }
    );
  }
  getSliderByCategory(categoria) {

    if (categoria === 'todo') {
      this.shouldFiltSlider = false;
    } else {
      this._productoService.getSliderPrincipalByCategory(categoria).subscribe(
        response => {
          console.log(response);
          // Validacion
          if (response.status = true ) {
            this.sliderProductsByCategory = response.datos;
            if (this.sliderProductsByCategory.length === 0) {
              this.shouldFiltSlider = false;
            }
            console.log(this.sliderProductsByCategory);
          }
        },
        error => {
          console.log(error as any);
        }
      );
    }

  }
}

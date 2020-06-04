import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { CategoriaService } from 'src/app/services/categoria/categoria.service'
import { Categoria } from 'src/app/models/categoria';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto/producto.service';
import * as AOS from 'aos';
import { PdfService } from 'src/app/services/pdf/pdf.service';
import { pdf } from 'src/app/models/pdf';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [  UserService, ProductoService, PdfService ]
})
export class HomeComponent implements OnInit {
  public pdf: pdf;
  public filterProducts: Array<Producto>;
  public categorias: Array<Categoria>;
  public productos: Array<Producto>;

  constructor(
    private _categoriaService: CategoriaService,
    private _productoService: ProductoService,
    private _pdfService: PdfService
  ) { }

  ngOnInit() {
    AOS.init();
    AOS.refresh();
    this.getCategorys();
    this.getProducts();
  }

  filterTag(nombreCategoria){
    let filterByCategory = new Array<Producto>();
    if (nombreCategoria == 'todo'){
      this.filterProducts = this.productos;
    }else{
      this.productos.forEach(producto =>{
        if( producto.categorias.length > 0   ){
          let agregar = false;
          producto.categorias.forEach( categoria =>{
            if (categoria.nombre == nombreCategoria){
              agregar = true;
            }
          });
          if (agregar){
            filterByCategory.push(producto);
            agregar = false;
          }

        }
      });
      this.filterProducts = filterByCategory;
    }
  }

  filterProduct(event){
    let filterValue = event.target.value.toLowerCase();
    this.filterProducts = this.productos.filter(producto=>{
      if(producto.nombre.toLowerCase().indexOf(filterValue) !== -1 ){
        return producto;
      }
    });


  }

  getProducts(){
    this._productoService.getProductos().subscribe(
      response => {
        if ( response.mensaje = 'Lista de todos los productos') {
          this.productos = response.datos;
        }
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  getCategorys(){
    this._categoriaService.getCategorias().subscribe(
      response => {
        if ( response.mensaje = 'Lista de todas las categorias.') {
          this.categorias = response.datos;
        }
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  showPDF(){
    window.location.replace(this.pdf.ruta);
  }

  getPDFURL(){
    this._pdfService.getPDFURL().subscribe(
      response =>{
        if(response.mensaje = 'Micelaneo encontrado correctamente.'){
          this.pdf = response.datos;
        }
        console.log(response);
      },
      error =>{
        console.log( <any>error);
      }
    );

    this.showPDF();
  }
}

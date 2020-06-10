import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto/producto.service';
import * as AOS from 'aos';
import { PdfService } from 'src/app/services/pdf/pdf.service';
import { pdf } from 'src/app/models/pdf';
import { Categoria } from 'src/app/models/categoria';

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
  public sliderProducts: Array<Producto>;
  public sliderProductsByCategory: Array<Producto>;
  public shouldFiltSlider: boolean;

  constructor(
    private _productoService: ProductoService,
    private _pdfService: PdfService
  ) { }

  ngOnInit() {
    AOS.init();
    AOS.refresh();
    this.getProducts();
    this.categorias = [
      new Categoria("combos",null,null),
      new Categoria("chocolates",null,null),
      new Categoria("dulces",null,null),
      new Categoria("salados", null, null),
      new Categoria("bebidas",null,null)];
      this.shouldFiltSlider = false;
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

  showPDF(){
    window.location.replace(this.pdf.ruta);
  }

  getPDFURL(){
    this._pdfService.getPDFURL().subscribe(
      response =>{
        if(response.status = true){
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

  getSliderPrincipal(){
    this._productoService.getSliderPrincipal().subscribe(
      response =>{
        console.log(response);
        if (response.status = true ){
          this.sliderProducts = response.datos
          console.log(this.sliderProducts);
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
  }

  getSliderByCategory(categoria){

    if (categoria === 'todo'){
      this.shouldFiltSlider = false;
    }else{
      this._productoService.getSliderPrincipalByCategory(categoria).subscribe(
        response =>{
          console.log(response);
          // Validacion
          if (response.status = true ){
            this.sliderProductsByCategory = response.datos
            console.log(this.sliderProductsByCategory);
          }
        },
        error =>{
          console.log(<any>error);
        }
      );
    }
    
  }
}

import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { UserService } from 'src/app/services/user/user.service';
import { ProductoService } from '../../services/producto/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as AOS from 'aos';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ UserService, ProductoService ]  
})
export class AdminComponent implements OnInit {
  public productos: Array<Producto>;
  public producto: Producto;
  public categorias: Array<Categoria>;
  public filterProducts: Array<Producto>;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productoService: ProductoService,
    private _categoriaService: CategoriaService,
    private _userService: UserService
  ) { 
      this.producto = new Producto(1,"","","",0,1,0,0,0,null,null,null);
  }

  ngOnInit() {
    if (!this._userService.getToken()){
      this._router.navigate(['login']);
    }
    AOS.init();
    AOS.refresh();
    this.token = this._userService.getToken();
    this._categoriaService.getCategorias().subscribe(
      response => {
        if ( response.mensaje = 'Lista de todas las categorias.'){
          this.categorias = response.datos;
        }
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
    this._productoService.getProductos().subscribe(
      response => {
        if ( response.mensaje = 'Lista de todos los productos'){
          this.productos = response.datos;
        }
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
    
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

  logout(){
    
    localStorage.removeItem('token');
    this.token = null;

    //redireccion a home 
    this._router.navigate(['home']);
  }
  
  filterProduct(event){
    let filterValue = event.target.value.toLowerCase();
    this.filterProducts = this.productos.filter(producto=>{
      if(producto.nombre.toLowerCase().indexOf(filterValue) !== -1 ){
        return producto;
      }
    });
    

  }

  onSubmit(form){
    console.log(this.producto);
    console.log("Flag createProduct");
    let product_category = [];
    for (var i = 0; i <= 4; i++) {
      let categoria = document.getElementById(`categoria${[i]}`) as HTMLInputElement;
      if (categoria.checked === true) {
        product_category.push(categoria);
      }
    }

    console.log(product_category);
  }
}

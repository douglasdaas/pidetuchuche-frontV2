// importar categoria
import {Categoria} from './categoria.js';
export class Producto{
    constructor(
        public id:number,
        public nombre:string,
        public ruta_imagen:string,
        public descripcion:string,
        public cantidad:number,
        public prioridad:number,
        public precio:number,
        public descuento:number,
        public precio_total:number,
        public created_at:any,
        public updated_at:any,
        public categorias: Array<Categoria>,
        public principal_categoria: boolean,
        public principal: boolean,
        public promo_gratis: boolean
        // Falta atributo pivot
    )
    {}
}

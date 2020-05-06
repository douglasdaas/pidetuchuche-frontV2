export class producto{
    constructor(
        public id:number,
        public nombre:string,
        public ruta_imagen:string,
        public description:string,
        public cantidad:number,
        public prioridad:number,
        public precio:number,
        public descuento:number,
        public precio_total:number,
        public created_at:Date,
        public updated_at:Date
        // Falta atributo pivot
    )
    {}
}

class Producto {
  constructor( codigoProducto,nombre, color, precio, cantidad){
    this.id = this.generarId();
    this.codigoProducto = codigoProducto;
    this.nombre = nombre;
    this.color = color;
    this.precio = precio;
    this.cantidad = cantidad;
  }

  generarId() {
    return Math.random().toString(36).substr(2, 18);
  }


}

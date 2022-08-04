
class InfoDeProductos {
    constructor(img, nombre, descripcion, precio, id) {
        this.img = img;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.id = id;
        this.cantidad = 1;
    };
};
//array donde se guardan los productos
const infoDeProductos = [];

infoDeProductos.push(new InfoDeProductos("imagenes/papas.jpg", "Papa", "Papas calidad-precio", 1, 1));
infoDeProductos.push(new InfoDeProductos("imagenes/cebollin.jpg", "Cebolla", "Cebollas calidad-precio", 1.2, 2));
infoDeProductos.push(new InfoDeProductos("imagenes/pina.jpg", "Piña", "Piñas calidad-precio", 2.1, 3));
infoDeProductos.push(new InfoDeProductos("imagenes/fresa.jpg", "Fresas", "Fresas calidad-precio", 0.6, 4));

//prueba agregar más productos
infoDeProductos.push(new InfoDeProductos("imagenes/cebolla.jpg", "Cebolla", "Cebollas calidad-precio", 0.4, 5));
infoDeProductos.push(new InfoDeProductos("imagenes/lechuga.jpg", "Lechuga", "Lechugas calidad-precio", 0.9, 6));
infoDeProductos.push(new InfoDeProductos("imagenes/palta.jpg", "Palta", "Paltas calidad-precio", 3.1, 7));
infoDeProductos.push(new InfoDeProductos("imagenes/platano.jpg", "Plátanos", "Plátanos calidad-precio", 1.7, 8));

export default infoDeProductos;
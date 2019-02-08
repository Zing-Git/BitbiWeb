export interface Producto {
    _id: string;
    codigoProveedor: string;
    categoria: string;
    subcategoria: string;
    nombreProducto: string;
    precioProveedor: number;
    precioSugerido: number;
    stock: number;
    unidadMedida: string;
}
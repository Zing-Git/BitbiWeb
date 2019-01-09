export class ProductoModel {

    idProveedor: string;
    productos: [
        {
            codigoProveedor: string; //"1",
            nombreProducto: string; //"shampoo Kerstase black edition",
            precioProveedor: number; //// 1425,
            precioSugerido: number; //// 1950,
            categoria: string; //"cuidado capilar",
            subcategoria: string; //"shampoo",
            stock: number; // 10,
            unidadMedida: string;// "unidad"
        }

    ]
}
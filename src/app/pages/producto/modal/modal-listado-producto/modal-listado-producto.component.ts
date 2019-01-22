import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-modal-listado-producto',
  templateUrl: './modal-listado-producto.component.html',
  styleUrls: ['./modal-listado-producto.component.scss']
})
export class ModalListadoProductoComponent implements OnInit {

  idProducto : string;
  productoForm = new FormGroup({
    _id: new FormControl(''),
    codigoProveedor: new FormControl(''),
    categoria: new FormControl(''),​​​
    subcategoria: new FormControl(''),    
    nombreProducto: new FormControl(''),
    precioProveedor: new FormControl(''),
    precioSugerido: new FormControl(''),
    stock: new FormControl(''),    
    ​​​unidadMedida: new FormControl('')
  });
  /*_id: "5c36ceda7ab87e001589e87c"​​​
categoria: "VERDURAS"​​​
codigoProveedor: "A-1"​​​
imagenes: Array []​​​
nombreProducto: "PAPA ANDINA"​​​
precioProveedor: 12​​​
precioSugerido: 15​​​
stock: -63
​​​subcategoria: "VERDURAS"
​​​unidadMedida: "BOLSA"*/
  constructor(public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
  }

  modificar(){
    console.warn(this.productoForm.value);
  }

  cargarDatos(datos: any){
    console.log(datos);
    this.idProducto = datos._id;
    this.productoForm.controls['codigoProveedor'].setValue(datos.codigoProveedor);
    this.productoForm.controls['categoria'].setValue(datos.categoria);
    this.productoForm.controls['subcategoria'].setValue(datos.subcategoria);
    this.productoForm.controls['nombreProducto'].setValue(datos.nombreProducto);
    this.productoForm.controls['precioProveedor'].setValue(datos.precioProveedor);
    this.productoForm.controls['precioSugerido'].setValue(datos.precioSugerido);
    this.productoForm.controls['stock'].setValue(datos.stock);
    this.productoForm.controls['unidadMedida'].setValue(datos.unidadMedida);
  }

  cerrarModal(event) {
    
    //this.cuotasSimuladas.lenght = 0;
    this.ngxSmartModalService.getModal('listadoModal').close();
}

}
     
         
    
     
    
    
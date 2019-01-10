import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { ProductoModel } from 'src/app/modelos/productoModel';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import 'hammerjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {

  productoModel: any = new ProductoModel();

  productoForm: FormGroup;


  constructor(private productoServices: ProductoService, private formBuilder: FormBuilder, ) {

    this.productoForm = this.formBuilder.group({
      codigoProveedor: new FormControl('', Validators.required), //"1",
      nombreProducto: new FormControl('', Validators.required), //"shampoo Kerstase black edition",
      precioProveedor: new FormControl('', Validators.required), //// 1425,
      precioSugerido: new FormControl('', Validators.required), //// 1950,
      categoria: new FormControl('', Validators.required), //"cuidado capilar",
      subcategoria: new FormControl('', Validators.required), //"shampoo",
      stock: new FormControl('', Validators.required), // 10,
      unidadMedida: new FormControl('', Validators.required),// "unidad"
    })
  }

  ngOnInit() {
  }

  postProducto() {

    this.productoModel.productos = new Array({
   
      codigoProveedor: this.productoForm.controls['codigoProveedor'].value,
      nombreProducto: this.productoForm.controls['nombreProducto'].value,
      precioProveedor: this.productoForm.controls['precioProveedor'].value,
      precioSugerido: this.productoForm.controls['precioSugerido'].value,
      categoria: this.productoForm.controls['categoria'].value,
      subcategoria: this.productoForm.controls['subcategoria'].value,
      stock: this.productoForm.controls['stock'].value,
      unidadMedida: this.productoForm.controls['unidadMedida'].value,
    });

    this.productoServices.postProducto(this.productoModel).subscribe(result =>{
      console.log(result);
      if(result){
        Swal('Felicidades', 'Acaba de Cargar un Producto', 'success');
        this.productoForm.reset();
      }else{
        Swal('Ocurrio un problema', 'Vuelva a intentar ', 'warning');
      }
    });
    
  }

}
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from './../../../services/producto/producto.service';
import 'hammerjs';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Pipe, PipeTransform } from '@angular/core';
import { ModalListadoProductoComponent } from '../modal/modal-listado-producto/modal-listado-producto.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Pipe({
  name: 'filter'
})

@Component({
  selector: 'app-listao-producto',
  templateUrl: './listado-producto.component.html',
  styleUrls: ['./listado-producto.component.scss']
})
export class ListadoProductoComponent implements OnInit, PipeTransform {

  @ViewChild(ModalListadoProductoComponent) hijo: ModalListadoProductoComponent;
  serachText: string;
  productos: any[];

  constructor(private productoServices: ProductoService,
    public ngxSmartModalService: NgxSmartModalService,
    private spinnerService: Ng4LoadingSpinnerService) {
    this.spinnerService.show();
    this.getProductos();
  }

  ngOnInit() {
  }

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(it => {
      return it.toLowerCase().includes(searchText);
    });
  }



  getProductos() {


    this.productoServices.postGetProductos().subscribe(result => {
      if (result) {
        this.productos = JSON.parse(localStorage.getItem('listadoProductos'));
        console.log(this.productos);
      }
    });


  }

  modificar() {
    let productosAModificar = new Array();
    this.productos.forEach(x => {
      productosAModificar.push({
        idProducto: x._id,
        precioProveedor: x.precioProveedor,
        precioSugerido: x.precioSugerido,
        stock: x.stock
      });
    });

    this.productoServices.postActualizarProductos(productosAModificar).subscribe(result => {
      if (result) {
        Swal({

          text: 'Se actualizaron los productos correctamente',
          type: 'success',
          showCancelButton: false,
          confirmButtonText: 'ACEPTAR!',
          confirmButtonColor: '#488aff',
          animation: true
        }).then(resultado => {
          console.log(resultado);
          if (resultado) {
            //this.spinnerService.show();
            //this.getProductos();
            location.reload();
          }

        })
        //Swal('Felicidades', 'Se actualizaron los productos correctamente', 'success');

      } else {
        Swal('Error', 'Ocurrio un problema, vuelva a intentar!', 'error');
      }
    });
  }


  visualizarProducto(producto: any){
    this.hijo.cargarDatos(producto)
      this.ngxSmartModalService.getModal('listadoModal').open();
  }
}


/* "idProducto":"5c2fc7a8725ca2694164c2bd",
			"codigoProveedor": "10",
    		"precioProveedor": 1500,
    		"precioSugerido": 2000,
    		"stock":20*/
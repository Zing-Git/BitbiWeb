import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ProductoService } from './../../../services/producto/producto.service';
import 'hammerjs';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Pipe, PipeTransform } from '@angular/core';
import { ModalListadoProductoComponent } from '../modal/modal-listado-producto/modal-listado-producto.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

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
  productos: any[] = new Array();
  empaques: any[];

  //paginacion
  p: number = 1;


  constructor(private productoServices: ProductoService,
    public ngxSmartModalService: NgxSmartModalService,
    private spinnerService: Ng4LoadingSpinnerService,
    private route: ActivatedRoute, private router: Router) {

    this.spinnerService.show();
    this.getProductos();
    console.log(this.productos);
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

  pageChange(newPage: number) {
    this.router.navigate([''], { queryParams: { page: newPage } });
  }

  getProductos() {


    this.productoServices.postGetProductos().subscribe(result => {
      if (result) {
        this.productos = JSON.parse(localStorage.getItem('listadoProductos'));
        
        this.obtenerEmpaques();
      }
    });

    
  }

  modificar1() {
    console.log(this.productos);
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
        Swal.fire({

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
        Swal.fire('Error', 'Ocurrio un problema, vuelva a intentar!', 'error');
      }
    });
  }


  visualizarProducto(producto: any) {
    this.hijo.cargarDatos(producto)
    this.ngxSmartModalService.getModal('listadoModal').open();
  }

  irImportarProductos() {

  }


  obtenerEmpaques() {
    let arreglo = new Array();
    this.productos.forEach(x => {
      arreglo.push(x.empaque);
    })

    this.empaques = arreglo.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    })

    
  }

  goToCarga(){
    this.router.navigate(['/carga-producto']);
  }

}


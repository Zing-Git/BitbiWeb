import { Component, OnInit } from '@angular/core';
import { ProductoService } from './../../../services/producto/producto.service';
import 'hammerjs';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-listao-producto',
  templateUrl: './listado-producto.component.html',
  styleUrls: ['./listado-producto.component.scss']
})
export class ListadoProductoComponent implements OnInit {

  productos: any;
  constructor(private productoServices: ProductoService) {
    this.getProductos();
   }

  ngOnInit() {
  }

  getProductos(){

    this.productoServices.postGetProductos().subscribe(result=>{
      if (result){
        this.productos = JSON.parse(localStorage.getItem('listadoProductos'));
      }
    });
  }
}

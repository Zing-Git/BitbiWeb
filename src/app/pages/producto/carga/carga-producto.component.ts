import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalXlsxProductoComponent } from '../modal/modal-xlsx/modal-xlsx-producto.component';
import { ProductoModel } from 'src/app/modelos/productoModel';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { FormBuilder } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import 'hammerjs';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { Producto } from './../model/producto';

@Component({
  selector: 'app-carga-producto',
  templateUrl: './carga-producto.component.html',
  styleUrls: ['./carga-producto.component.scss']
})
export class CargaProductoComponent implements OnInit {

  @ViewChild(ModalXlsxProductoComponent) hijo: ModalXlsxProductoComponent;
  productoModel: any = new ProductoModel();
  currentJustify = 'justified';
  procesarData: boolean = false;
  data: any[];
  productos : Producto[];
  tabs1 : boolean = false;
  tbas2 : boolean = false;

  settings = {
    actions: {
      columnTitle: 'Accion',
      add: false,
      delete: { deleteButtonContent : 'Borrar', confirmDelete : true },
      edit: false,
      imprimirPDF: false,
      position: 'right',
      // custom: [
      //   {
      //     name: 'eliminarRegistro',
      //     title: 'Eliminar'
      //   }
      // ],
    },
    columns: {
      0: {
        title: 'Nombre'
      },
      1: {
        title: 'Precio'
      },
      2: {
        title: 'Unidad Medida'
      },
      3: {
        title: 'Stock'
      }
    }
  };
  
  constructor(private productoServices: ProductoService, 
    private formBuilder: FormBuilder, public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
  }

  procesar(){
    this.productos = this.data;
   console.log(this.productos);
   this.productos.forEach(x => {
     console.log(x);
   })
    // this.hijo.generarTabla(row);
    // this.ngxSmartModalService.getModal('productoModal').open();
   this.tabs1 = true;
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    //this.data = new Array();

    const target: DataTransfer = <DataTransfer>(evt.target);

    if (target.files.length !== 1) throw new Error('No puede leer multiples archivos');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.procesarData = true;
    };
    reader.readAsBinaryString(target.files[0]);

  
    this.procesar();
  }

  onCustom(event) {
    console.log(event);

    const evento = (`${event.action}`);
    const dni = (`${event.data.dni}`);
    const id = (`${event.data._id}`);

    switch (evento) {
      case 'view': {
        //this.router.navigate(['formclienteviewedit', evento, dni]);
        //this, this.router.navigate(['viewcredito', evento, id]);
        break;
      }
      case 'eliminarRegistro': {
        console.log('Registro');
        break;
      }
      default: {
        console.log('Invalid choice');
        break;
      }
    }
    
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalXlsxProductoComponent } from '../modal/modal-xlsx/modal-xlsx-producto.component';
import { ProductoModel } from 'src/app/modelos/productoModel';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import 'hammerjs';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { Producto } from './../model/producto';
import { LocalDataSource } from 'ng2-smart-table';

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
  productos: Producto[];
  productoIndividual: Producto;
  tabs1: boolean = false;
  tbas2: boolean = false;

  empaques: any[] = new Array();

  source: LocalDataSource = new LocalDataSource();

  settings = {
    actions: {
      columnTitle: 'Accion',
      add: true,
      delete: { confirmDelete: true },
      edit: true,
      imprimirPDF: false,
      position: 'right',
    },
    columns: {
      0: {
        title: 'Codigo de Proveedor'
      },
      7: {
        title: 'Producto'
      },
      9: {
        title: 'Empaque',
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: this.empaques
                 
          
          }
        },
        valuePrepareFunction: (cell) => {
          console.log(cell);
          return cell;
          //return this.findDayNameById(cell);
        }
      },
      5: {
        title: 'Unidades'
      },
      8: {
        title: 'Unidad Medida'
      },
      10: {
        title: 'Stock'
      },
      1: {
        title: 'Precio',
        valuePrepareFunction: (value) => {
          return value === 'precioProveedor' ? value : Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);
        }
      },
      3: {
        title: 'Categoria'
      },
      4: {
        title: 'Sub categoria'
      },
      11: {
        title: 'Detalle',
        width: '15%',
        filter: false,
        editor: {
          type: 'textarea',
        }
      },
      12: {
        title: 'Nota Interna',
        width: '15%',
        filter: false,
        editor: {
          type: 'textarea'
        }
      }
    },
    pager: {
      perPage: 5
    },
  };

  constructor(private productoServices: ProductoService,
    public ngxSmartModalService: NgxSmartModalService
  ) {
    console.log("estoy en carga");

  }

  ngOnInit() {
    this.source = new LocalDataSource([]); 
  }

  procesar() {

    this.productos = this.data;
    this.productoModel.Producto = this.productos;
    this.obtenerEmpaques();
    console.log(this.productoModel);
    this.tabs1 = true;

    this.source = new LocalDataSource([]); 
    this.source.load(this.productos);
    this.source.load(this.productos.slice(0));
  }

  obtenerEmpaques() {
    let arreglo = new Array();
    let filtroArreglo = new Array();
    //this.empaques = new Array();
    this.productos.forEach(x => {
      console.log('EN EMPAQUE');
      
      arreglo.push(x[9]);
    })

    filtroArreglo = arreglo.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    })

    console.log(filtroArreglo);
    //crear una lista con value title
    filtroArreglo.forEach(x =>{
      this.empaques.push({
      value: x,
      title: x
    });
    })
    console.log(this.empaques);
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

  getDataFromTable(){
    let data = [];
    this.source.getAll().then(value => { 
        value.forEach(element => {
            data.push(element); 
        });;
    });
    console.log(data);
  }
}

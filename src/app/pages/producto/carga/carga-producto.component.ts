import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalXlsxProductoComponent } from '../modal/modal-xlsx/modal-xlsx-producto.component';
import { ProductoModel } from 'src/app/modelos/productoModel';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import 'hammerjs';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { Producto } from './../model/producto';
import { LocalDataSource } from 'ng2-smart-table';
import { FormControl } from '@angular/forms';

import { Options, ChangeContext } from 'ng5-slider';

@Component({
  selector: 'app-carga-producto',
  templateUrl: './carga-producto.component.html',
  styleUrls: ['./carga-producto.component.scss']
})
export class CargaProductoComponent implements OnInit {
//https://www.cubicfactory.com/bootstrap-tablas-responsive-con-stacktable/  TABLAS
  @ViewChild(ModalXlsxProductoComponent) hijo: ModalXlsxProductoComponent;
  productoModel: any = new ProductoModel();

  currentJustify = 'justified';
  procesarData: boolean = false;
  data: any[];
  productos: Producto[];
  

  tabs1: boolean = false;
  tbas2: boolean = false;

  empaques: any[] = new Array();

  progreso1: number = 50;
  progreso2: number = 30;

  source: LocalDataSource = new LocalDataSource();

  //slider https://www.npmjs.com/package/ngx-bootstrap-slider
  //value: number = 5;
  //enabled: boolean = true;

  //ng5 slider
  sliderControl: FormControl = new FormControl(0);

  options: Options = {
    floor: 0,
    ceil: 200
  };

  valorAComparar: number = 0;
  cambioDeValor: boolean = false;
  listadoInicial: any;
  listadoFinal: any;

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
      6: {
        title: 'Producto'
      },
      8: {
        title: 'Empaque',
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: this.empaques


          }
        },
        valuePrepareFunction: (cell) => {
          return cell;
          //return this.findDayNameById(cell);
        }
      },
      5: {
        title: 'Unidades'
      },
      7: {
        title: 'Unidad Medida'
      },
      9: {
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
      10: {
        title: 'Detalle',
        width: '15%',
        filter: false,
        editor: {
          type: 'textarea',
        }
      },
      11: {
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

    this.tabs1 = true;

    this.source = new LocalDataSource([]);
    this.source.load(this.productos);
    this.source.load(this.productos.slice(0));
  }

  obtenerEmpaques() {
    let arreglo = new Array();
    let filtroArreglo = new Array();

    this.productos.forEach(x => {
      arreglo.push(x[9]);
    })

    filtroArreglo = arreglo.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    })


    filtroArreglo.forEach(x => {
      this.empaques.push({
        value: x,
        title: x
      });
    })

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

  goNextTab() {
    this.getDataFromTable();
  }

  getDataFromTable() {
    let data = new Array();
    let primerPaso = false; //para el titulo

    this.source.getAll().then(value => {
      value.forEach(element => {

        if (primerPaso === true) {
          let producto = {
            codigoProveedor: element[0],
            nombreProducto: element[6],
            empaque: element[8],
            unidadesPorEmpaque: element[5],
            precioProveedor: element[1],
            precioSugerido: element[2],
            categoria: element[3],
            subcategoria: element[4],
            stock: element[9],
            unidadMedida: element[7],
          };

          data.push(producto);

          //data.push(element);
        } else {
          primerPaso = true;
        }

      });;
    });
    this.productoModel.productos = data;

  }

  //https://angular-slider.github.io/ng5-slider/demos#user-events-slider
  //formatter(parametro: any){
  //  return 'valor : '+ parametro;
  //}

  onUserChange(changeContext: any): void {
   
    if (this.cambioDeValor === false) { 
      localStorage.setItem('productosInicial', JSON.stringify(this.productoModel.productos));
      this.cambioDeValor = true;
    }

    
    this.productoModel.productos = JSON.parse(localStorage.getItem('productosInicial'));
    for (var i = 0; i < this.productoModel.productos.length; i++) {

      let porcentaje = ( changeContext.value * this.productoModel.productos[i].precioProveedor) / 100;
      this.productoModel.productos[i].precioSugerido =
        this.productoModel.productos[i].precioSugerido + porcentaje;

    }
    this.listadoFinal = this.productoModel.productos;

    if (changeContext.value === 0) {
      
      this.productoModel.productos = JSON.parse(localStorage.getItem('productosInicial'));
    }
  }

  guardarProductos(){
    console.log(this.productoModel);
    this.productoServices.postProducto(this.productoModel).subscribe(result => {
      console.log('REGRESANDO DE GUARDAR PROVEEDORES');
      console.log(result);
      if (result) {
        Swal.fire({

          text: 'Se guardaron los productos correctamente',
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
}

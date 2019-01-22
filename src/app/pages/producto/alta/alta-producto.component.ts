import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { ProductoModel } from 'src/app/modelos/productoModel';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import 'hammerjs';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ModalXlsxProductoComponent } from './../modal/modal-xlsx/modal-xlsx-producto.component';



type AOA = any[][];

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styles: []
})
export class AltaProductoComponent implements OnInit {

  @ViewChild(ModalXlsxProductoComponent) hijo: ModalXlsxProductoComponent;
  productoModel: any = new ProductoModel();

  productoForm: FormGroup;

  //data: AOA;
  data: any = [];
  arregloJson: any;
  procesarData: boolean = false;
  denegarVista: boolean = false;

  constructor(private productoServices: ProductoService, 
    private formBuilder: FormBuilder, public ngxSmartModalService: NgxSmartModalService) {

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
    this.arregloJson = new Array();
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

    this.productoServices.postProducto(this.productoModel).subscribe(result => {
      console.log(result);
      if (result) {
        Swal('Felicidades', 'Acaba de Cargar un Producto', 'success');
        this.productoForm.reset();
      } else {
        Swal('Ocurrio un problema', 'Vuelva a intentar ', 'warning');
      }
    });

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

  
    
  }
 

  procesar(row: any){
    
    this.hijo.generarTabla(row);
    this.ngxSmartModalService.getModal('productoModal').open();
  }

  getItem(item : any){
    console.log(item);
  }

  
}
import { Component, OnInit } from '@angular/core';
import { ProveedorService } from 'src/app/services/service.index';
import { retry } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styles: []
})
export class PedidosComponent implements OnInit {

  idProveedor: string;
  pedidos: any;
  pedidosInformados: any;
  pedidosAceptados: any;
  pedidosRechazados: any;
  pedidosOtros: any;

  pedidoHabilitado: boolean;
  estadoRechazado: boolean;
  estadoInformado: boolean;
  estadoAceptado: boolean;

  cantRechazado: number;
  cantInformado: number;
  cantAceptado: number;

  inicial: string;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  //datatable
  dtOptions: DataTables.Settings = {};
  
  
  constructor(public proveedorServices: ProveedorService) {
    this.getPedidosProveedor();
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  getPedidosProveedor() {

    this.pedidos = new Array();
    this.proveedorServices.getPedidosProveedor().subscribe(result => {
      if (result) {
        this.pedidos = JSON.parse(localStorage.getItem('pedidosProveedor'));
        console.log(this.pedidos);
        this.cargarCombos();
      } else {
        console.log('NADA');
      }
    });



  }

  cargarCombos() {

    this.pedidosInformados = new Array();
    this.pedidosAceptados = new Array();
    this.pedidosRechazados = new Array();
    this.pedidosOtros = new Array();
    //this.pedidos = new Array();

    this.cantAceptado = 0;
    this.cantInformado = 0;
    this.cantRechazado = 0;

    //this.pedidos = this.auxiliar.crearArray(JSON.parse(ENV.PEDIDOS));
    this.pedidos.forEach(x => {

      if (x.comercio != null) {
        this.pedidoHabilitado = false;
        switch (x.estadoPedido) {
          case "RECHAZADO": {
            this.cantRechazado += 1;
            if (this.inicial != 'informado') {
              if (this.inicial != 'aprobado') {
                this.inicial = 'rechazado';
              }

            }
            this.estadoRechazado = false;
            this.pedidosRechazados.push(x);

            break;
          }
          case "PEDIDO SOLICITADO": {
            this.cantInformado += 1;
            this.inicial = 'informado';
            this.estadoInformado = false;
            this.pedidosInformados.push(x);
            break;
          }
          case "ACEPTADO": {
            this.cantAceptado += 1;
            if (this.inicial != 'informado') {
              this.inicial = 'aprobado';
            }
            this.estadoAceptado = false;
            this.pedidosAceptados.push(x);
            break;
          }
          default: {
            this.pedidosOtros.push(x);
            break;
          }
        }

      }
    })

    //this.obtenerCantidadPedidos()

  }

}

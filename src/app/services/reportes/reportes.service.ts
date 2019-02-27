import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment as ENV } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { retry, map } from 'rxjs/operators';

const cudOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

@Injectable({
  providedIn: 'root'
})

export class ReportesService{

    private urlBase = ENV.BASE_URL;
    private urlGetResumenEstadistico = this.urlBase + '/reportes/resumen_estadistico/';
    private idProveedor: string;

    constructor(public http: HttpClient, public router: Router) {
        this.idProveedor = localStorage.getItem('idProveedor');
      }

      postReportePrincipal(fechas: any): Observable<any> {
        const parametros = {
          idProveedor: this.idProveedor,
          anioInicio: fechas.anioInicio,
          mesInicio: fechas.mesInicio,
          diaInicio: fechas.diaInicio,
          anioFin: fechas.anioFin,
          mesFin: fechas.mesFin,
          diaFin: fechas.diaFin
        };
    
        console.log(parametros);
        return this.http.post<any[]>(this.urlGetResumenEstadistico, parametros, cudOptions)
          .pipe(
            map(result => {
              console.log(result);
            if (result['ok']) {
                localStorage.setItem('reportePrincipal', JSON.stringify(result['estadisticas']));
              return true;
            } else {
              return false;
            }
          }));
      }
}




/** Reporte  Principal
 * 
 * {
    "ok": true,
    "message": "Devolviendo estadisticas",
    "estadisticas": {
        "montoTotalPedidos": 100,
        "cantidadTotalPedidos": 3,
        "cantidadPedidosAceptados": 1,
        "cantidadPedidosRechazados": 1,
        "cantidadPedidosInformados": 1,
        "montoPromedioPorPedido": 100,
        "productosPedidos": 4,
        "productosMasPedidos": 0,
        "productosMenosPedidos": 0,
        "rankingProductos": [
            {
                "nombre": "CEBOLLA ANDINA",
                "unidadMedida": "BOLSA",
                "cantidad": 8
            },
            {
                "nombre": "QUESO DE CABRA",
                "unidadMedida": "UNIDAD",
                "cantidad": 4
            },
            {
                "nombre": "PAPA ANDINA",
                "unidadMedida": "BOLSA",
                "cantidad": 3
            },
            {
                "nombre": "PAPA",
                "unidadMedida": "CAJON",
                "cantidad": 2
            }
        ],
        "clientesQuePidieron": 0,
        "promedioPedidosPorCliente": 0,
        "pedidosPorDia": null,
        "totalClientes": 0,
        "nuevosClientes": 0,
        "clientesFieles": 0,
        "clientesNoFieles": 0
    }
}
 */
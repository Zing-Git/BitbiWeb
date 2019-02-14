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
export class ProveedorService {

  private urlBase = ENV.BASE_URL;
  private urlGetPedidos = this.urlBase + '/pedido/listar_pedidos_proveedor/?idProveedor=';
  private urlGetPedidosProveedor = this.urlBase + '(/pedido/listar_pedidos_proveedor_v2_stock/';  //'/pedido/listar_pedidos_proveedor/';
  ///pedido/listar_pedidos_pendientes/?idProveedor=5bbdf4bd39f9bf12605c6bb2
  private urlGetComercios = this.urlBase + '/proveedor/consultar_comercios_de_proveedor/?idProveedor='

  private pedidos = new Array();
  private idProveedor: string;

  constructor(public http: HttpClient, public router: Router) {
    this.idProveedor = localStorage.getItem('idProveedor');
  }

  getPedidosProveedor(): Observable<any> {

    let url = this.urlGetPedidos + this.idProveedor;

    return this.http.get<any[]>(url, cudOptions).pipe(
      retry(2),
    map((result : any) => {
      if (result['ok']) {
        if (result['pedidos_array']) {

          localStorage.setItem('pedidosProveedor', JSON.stringify(result['pedidos_array']));
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }));
  }

  getComerciosProveedor(): Observable<any>{

    let url = this.urlGetComercios + this.idProveedor;
console.log(url);
    return this.http.get<any[]>(url,cudOptions).pipe(
      retry(2),
      map(result => {
        
        if(result['ok']){
          localStorage.setItem('comerciosProveedor', JSON.stringify(result['comercios']));
          console.log(result);
          return true;
        }else{
          return false;
        }
      })
    )
  }
}

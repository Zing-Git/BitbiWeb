import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment as ENV } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { retry } from 'rxjs/operators';
import { BrowserAnimationBuilder } from '@angular/platform-browser/animations/src/animation_builder';

const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private urlBase = ENV.BASE_URL;
  private urlGetPedidos = this.urlBase + '/pedido/listar_pedidos_proveedor/';
  private urlGetPedidosProveedor = this.urlBase + '/pedido/listar_pedidos_proveedor/';
  ///pedido/listar_pedidos_pendientes/?idProveedor=5bbdf4bd39f9bf12605c6bb2

  private pedidos = new Array();
  private idProveedor: string;

  constructor(public http: HttpClient, public router: Router) {
    this.idProveedor = localStorage.getItem('idProveedor');
  }

  getPedidosProveedor(): Observable<any> {

    let url = this.urlGetPedidos + '?idProveedor=' + this.idProveedor;

    return this.http.get<any[]>(url, cudOptions).pipe(
      retry(2)
    ).map(result => {
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
    });
  }
}

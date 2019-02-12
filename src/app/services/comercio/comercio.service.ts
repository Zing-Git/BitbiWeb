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
export class ComercioService {

  private urlBase = ENV.BASE_URL;
  private urlGetComercios = this.urlBase + '/proveedor/consultar_comercios_de_proveedor/?idProveedor=5c15095f224a150b4689ffc7';
  private urlGetPedidosProveedor = this.urlBase + '(/pedido/listar_pedidos_proveedor_v2_stock/';  //'/pedido/listar_pedidos_proveedor/';
  ///pedido/listar_pedidos_pendientes/?idProveedor=5bbdf4bd39f9bf12605c6bb2

  private pedidos = new Array();
  private idProveedor: string;

  constructor(public http: HttpClient, public router: Router) { }

  

}

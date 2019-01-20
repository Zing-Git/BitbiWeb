import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment as ENV } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { retry } from 'rxjs/operators';
import { ProductoModel } from './../../modelos/productoModel';

const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private idProveedor: string;
  private urlBase = ENV.BASE_URL;
  private urlPostNuevoProducto = this.urlBase + '/producto/nuevo/';
  private urlPostGetProductos = this.urlBase + '/producto/obtener_productos/';

  //private idProveedor: string;

  constructor(public http: HttpClient, public router: Router) {
    this.idProveedor = localStorage.getItem('idProveedor');
  }

  postProducto(producto: ProductoModel): Observable<any> {
    const newSession = Object.assign({}, producto);
    return this.http.post<any>(this.urlPostNuevoProducto, newSession, cudOptions)
      .map(result => {
        console.log(result);
        if (result['ok']) {
          return true;
        }
        else {
          return false;
        }
      });
  }

  postGetProductos(): Observable<any>{
    const newSession = Object.assign({}, this.idProveedor);
    const url = this.urlPostGetProductos + '?idProveedor=' + this.idProveedor;
    return this.http.get<any>(url, cudOptions)
      .map(result => {
        console.log(result);
        if (result['ok']) {
          localStorage.setItem('listadoProductos', JSON.stringify(result['productos']));
          return true;
        }
        else {
          return false;
        }
      });
  }

}
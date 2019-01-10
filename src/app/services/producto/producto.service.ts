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

  private urlBase = ENV.BASE_URL;
  private urlPostNuevoProducto = this.urlBase + '/producto/nuevo/';


  //private idProveedor: string;

  constructor(public http: HttpClient, public router: Router) {
    //this.idProveedor = localStorage.getItem('idProveedor');
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

}
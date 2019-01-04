import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment as ENV } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { LoginModel } from 'src/app/modelos/loginModel';

var headers = new HttpHeaders();
headers.append('Access-Control-Allow-Origin', '*');
headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
headers.append('Accept', 'application/json');
headers.append('content-type', 'application/json');
headers.append('Content-Type', 'application/json');

const cudOptions = {
  headers: headers,
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlBase = ENV.BASE_URL;
  private urlPostGetComercioLogin = this.urlBase + '/comercio/ingresar/';
  public urlPostGetProveedorLogin = this.urlBase + '/proveedor/ingresar/';
  private urlLogout = this.urlBase + '/usuario/salir/';

  constructor(public http: HttpClient) { }


  getLoginComercio(loginModel: LoginModel): Observable<any[]> { //{Promise<HTTPResponse>

    const parametros = {
      nombreUsuario: loginModel.nombreUsuario,
      clave: loginModel.clave //,
      //idPush: ENV.IDPUSH.toString()
    };

    let obs = new Observable();

    obs.pipe(
      retry(2)
    ).subscribe();  //permite volver a intentar, en este caso dos veces
    return this.http.post<any[]>(this.urlPostGetComercioLogin, parametros, cudOptions);

  }

  getLoginProveedor(loginModel: LoginModel, recordar: boolean = false): Observable<any[]> { 

    console.log(loginModel);
    const parametros = {
      nombreUsuario: loginModel.nombreUsuario,
      clave: loginModel.clave
    };
    console.log(parametros);

    const newSession = Object.assign({}, parametros);

    return this.http.post<any[]>(this.urlPostGetProveedorLogin, newSession, cudOptions);

  }
}

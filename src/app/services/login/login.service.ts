import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment as ENV } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { retry } from 'rxjs/operators';
import { LoginModel } from 'src/app/modelos/loginModel';
import { Router } from '@angular/router';

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

  usuario: string;
  token: string;

  private urlBase = ENV.BASE_URL;
  private urlPostGetComercioLogin = this.urlBase + '/comercio/ingresar/';
  public urlPostGetProveedorLogin = this.urlBase + '/proveedor/ingresar/';
  private urlLogout = this.urlBase + '/usuario/salir/';

  constructor(public http: HttpClient, public router: Router) {
    this.cargarStorage();
   }

  estaLogeado() {
    return (this.token.length > 5 ? true : false);
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuarioCompleto'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  logout(){
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('idProveedor');

    this.router.navigate(['/login']);
  }

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

  getLoginProveedor(loginModel: LoginModel, recordar: boolean = false): Observable<any> {
console.log('estoy en servico');
    console.log(loginModel);
    const parametros = {
      nombreUsuario: loginModel.nombreUsuario,
      clave: loginModel.clave
    };

    if (recordar) {
      localStorage.setItem('usuario', loginModel.nombreUsuario);
    } else {
      localStorage.removeItem('usuario');
    }

    const newSession = Object.assign({}, parametros);

    return this.http.post<any[]>(this.urlPostGetProveedorLogin, newSession, cudOptions).map((resp: any) => {
        console.log(resp);
        localStorage.setItem('idProveedor', resp.proveedorDB[0]._id);
        localStorage.setItem('token', resp.usuario.token);
        localStorage.setItem('proveedor', JSON.stringify(resp.proveedorDB));
        localStorage.setItem('usuarioCompleto', JSON.stringify(resp.usuario));

        this.usuario = resp.usuario;
        this.token = resp.usuario.token;
        return true;
      });
  }
}

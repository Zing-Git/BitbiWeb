import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/service.index';
import { LoginModel } from '../modelos/loginModel';
import { retry } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
//ng g c login/register --flat -is --spect=false   se puede modificar animate.css

//declare function init_plugins();
//declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  newLogin: LoginModel = new LoginModel();
  recuerdame: boolean = false;

  constructor(private loginService: LoginService, public router: Router) { }

  ngOnInit() {
    //init_plugins();
  }

  getLogin(forma: NgForm) {
    if (forma.invalid) { return; } // que salga jeje
    console.log(forma.valid);
    console.log(forma.value);

    this.newLogin.nombreUsuario = forma.value.usuario;
    this.newLogin.clave = forma.value.clave;

    console.log(this.newLogin);

    this.loginService.getLoginProveedor(this.newLogin).pipe(
      retry(2)
    ).subscribe(resultProveedor => {
      console.log(resultProveedor);
      if (resultProveedor['ok'] == true) {
        console.log(resultProveedor);
      } else {
        Swal('Atención', 'Vuelva a ingresar las credenciales', 'error');

      }
    }, error => {
      Swal('Atención', 'Ocurrio un problema inesperado codigo: ' + error, 'error')

    });    //cierro promesa de proveedor

  }


}

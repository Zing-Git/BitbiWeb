import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: any;
  nombre: any;
  constructor(public loginServices: LoginService, public router: Router) { }

  ngOnInit() {
  }

  getUusuario() {
    this.usuario = JSON.parse(localStorage.getItem('proveedor')); 
    this.nombre = this.usuario[0].entidad.razonSocial
  }

  buscar( termino: string ) {
    this.router.navigate(['/busqueda', termino ]);
  }

}

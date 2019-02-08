import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/service.index';
import { SidebarService } from './../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: any;
  nombre: string;
  menu: any;
  otroMenu : any;

  constructor(public sidebarServices: SidebarService,
    public loginServices: LoginService) {
    this.getUusuario();
  }

  ngOnInit() {

  }

  getUusuario() {
    this.usuario = JSON.parse(localStorage.getItem('proveedor')); 
    this.nombre = this.usuario[0].entidad.razonSocial
    this.menu = this.sidebarServices.getMenu();

    this.otroMenu = this.sidebarServices.getMenu();
  }

}

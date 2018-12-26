import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SharedService,
  SidebarService,
  LoginService,
  ComercioService,
  ProveedorService,
  UtilidadesService
}
  from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    SharedService,
    SidebarService,
    LoginService,
    ComercioService,
    ProveedorService,
    UtilidadesService
  ]
})
export class ServiceModule { }

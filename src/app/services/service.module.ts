import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LoginGuardGuard,
  SharedService,
  SidebarService,
  LoginService,
  ComercioService,
  ProveedorService,
  UtilidadesService
}
  from './service.index';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SharedService,
    SidebarService,
    LoginService,
    ComercioService,
    ProveedorService,
    UtilidadesService,
    LoginGuardGuard
  ]
})
export class ServiceModule { }

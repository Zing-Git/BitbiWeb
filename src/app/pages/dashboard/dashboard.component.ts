import { Component, OnInit } from '@angular/core';
import { ProveedorService } from 'src/app/services/service.index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  idProveedor: string;
  pedidos: any;

  constructor(public proveedorServices: ProveedorService) { }

  ngOnInit() {
  }

  

}

import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes/reportes.service';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  fechaInicio: NgbDateStruct;
  fechaFin: NgbDateStruct;

  date: {year: number, month: number};
  idProveedor: string;
  pedidos: any;
  today: any;

  constructor(public reporteServices: ReportesService,
    private calendar: NgbCalendar) { }

  ngOnInit() {
  }

  getReporte(){

  }

  selectToday() {
    console.log(this.fechaInicio);
    console.log(this.fechaFin);
  }

}

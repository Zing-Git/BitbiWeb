import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes/reportes.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import 'hammerjs';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  fechaInicioSelected: boolean = false;
  fechaFinSelected: boolean = false;
  fechaInicio: NgbDateStruct;
  fechaFin: NgbDateStruct;

  date: { year: number, month: number };
  idProveedor: string;
  estadistica: any;
  today= new Date();

  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];//x
  public doughnutChartData: number[] = [350, 450, 100];  //y
  public doughnutChartType: string = 'line';// 'doughnut';

  constructor(public reporteServices: ReportesService,
    private calendar: NgbCalendar) {
    /*this.fechaFin = {
      day: (this.today.getDate() < 10 ? +('0' + this.today.getDate()) : this.today.getDate()) , 
      month: this.today.getMonth() + 1, 
      year: this.today.getFullYear()
    }*/
  }

  ngOnInit() {
  }

  getReporte() {
    console.log("en reporte");
    let fechas = {
      anioInicio: this.fechaInicio.year,
      mesInicio: this.fechaInicio.month,
      diaInicio: this.fechaInicio.day,
      anioFin: this.fechaFin.year,
      mesFin: this.fechaFin.month,
      diaFin: this.fechaFin.day
    }
    this.reporteServices.postReportePrincipal(fechas).subscribe( result =>{
      if(result){
        this.estadistica =  JSON.parse(localStorage.getItem('reportePrincipal'));
        console.log(this.estadistica);
      }
    })
  }

  selectToday() {


  }

  selectFrom() {
console.log(this.fechaInicio);
    this.fechaInicioSelected = true;
    if (this.fechaInicioSelected && this.fechaFinSelected) {
      this.obtenerEstadisticas();
    }
  }

  selectTo() {
    console.log(this.fechaFin);
    this.fechaFinSelected = true;
    if (this.fechaInicioSelected && this.fechaFinSelected) {
      this.obtenerEstadisticas();
    }
  }

  obtenerEstadisticas() {
    if (this.fechaInicioSelected && this.fechaFinSelected) {
      this.getReporte();
    } else {
      Swal.fire('Felicidades', 'Acaba de Cargar un Producto', 'success');
    }
  }
}

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html'
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;
  @Input() progreso : number = 50;
  @Input('nombre')  leyenda: string = '';

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  cambiarValor(valor: number){
    if(this.progreso >= 100 && valor > 0){
      this.progreso = 100;
      return;
    }
    if(this.progreso <=0 && valor < 0){
      this.progreso = 0;
      return;
    }

    this.progreso = this.progreso + valor;

    this.cambioValor.emit(this.progreso); 
  }

  onChange( newValue: number){

    //let elementoHTML: any = document.getElementsByName('progreso')[0];  //obtiene un arreglo con todos los elementos con el nombre proreso


    if(newValue >= 100){
      this.progreso = 100;
    }else if(newValue <= 0){
      this.progreso = 0;
    }else{
      this.progreso = newValue;
    }

    //elementoHTML.value = Number(this.progreso);
    this.txtProgress.nativeElement.value = this.progreso; 
    this.cambioValor.emit(this.progreso); 

    this.txtProgress.nativeElement.focus();  //para poner foco cuando se clickea en el mas o menos
  }

}

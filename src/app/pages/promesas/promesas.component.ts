import { Component, OnInit } from '@angular/core';
import { promise } from 'protractor';
import { reject } from 'q';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    let promesas = new Promise((resolve, reject) =>{

      let contador = 0;
      setInterval( ()=>{
        contador += 1;

        if(contador === 3) resolve();
      }, 1000)
    });

    promesas.then(
      () =>{
        console.log('Termino!!')
      }
    )
    .catch( error => console.error('error en la promesa', error));
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
    selector: 'app-modal-producto',
    templateUrl: './modal-producto.component.html',
    styles: []
})
export class ModalProductoComponent implements OnInit {
    procesarData: boolean = false;
    data: any;
    constructor(public ngxSmartModalService: NgxSmartModalService) { }

    ngOnInit() {
        this.data = new Array();
    }

    generarTabla(dataPadre: any) {
        console.log(dataPadre);
        this.data = dataPadre;

    }

    cerrarModal(event) {
        this.data.lenght = 0;
        //this.cuotasSimuladas.lenght = 0;
        this.ngxSmartModalService.getModal('productoModal').close();
    }

    getItem(item: any) {
        console.log(item);
    }

    procesarInformacion(data: any){

    }
}

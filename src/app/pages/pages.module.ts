import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

import { ChartsModule } from 'ng2-charts';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { MaterialModule } from '../1material.comp';
import { ProductoComponent } from './producto/producto.component';

//cada carpeta tiene un modulo para trabajr ordenadamente
@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        //PagesComponent,
        IncrementadorComponent,
        PromesasComponent,
        RxjsComponent,
        PedidosComponent,
        ProductoComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        // MaterialModule
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        MaterialModule
    ]
})

export class PagesModule {

}
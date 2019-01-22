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

import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';

import { DataTablesModule } from 'angular-datatables';
import { AltaProductoComponent } from './producto/alta/alta-producto.component';
import { ListadoProductoComponent } from './producto/listado/listado-producto.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ModalXlsxProductoComponent } from './producto/modal/modal-xlsx/modal-xlsx-producto.component';
import { ModalListadoProductoComponent } from './producto/modal/modal-listado-producto/modal-listado-producto.component';

//spinner
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

//cada carpeta tiene un modulo para trabajr ordenadamente
@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        ModalXlsxProductoComponent,
        IncrementadorComponent,
        PromesasComponent,
        RxjsComponent,
        PedidosComponent,
        AltaProductoComponent,
        ListadoProductoComponent,
        ModalListadoProductoComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        // MaterialModule
    ],
    imports: [
        DataTablesModule,
        Ng2SearchPipeModule,
        
        ReactiveFormsModule,        
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        MaterialModule,
        NgxSmartModalModule.forRoot(),
        Ng4LoadingSpinnerModule.forRoot()
    ],
    providers: [

        NgxSmartModalService
    ],
})

export class PagesModule {

}
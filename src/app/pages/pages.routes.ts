import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { LoginGuardGuard } from './../services/guards/login-guard.guard';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AltaProductoComponent } from './producto/alta/alta-producto.component';
import { ListadoProductoComponent } from './producto/listado/listado-producto.component';


const pagesRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ LoginGuardGuard ],
        data: { titulo: 'Principal' }
    },
    { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
    { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
    { path: 'pedidos', component: PedidosComponent, data: { titulo: 'Pedidos' } },
    { path: 'producto', component: AltaProductoComponent, data: { titulo: 'Producto' } },
    { path: 'listado-producto', component: ListadoProductoComponent, data: { titulo: 'Listado de Producto' } },
    //{ path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes de Tema' } },
    //{ path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
    //{ path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
    // Mantenimientos
   // {
    //    path: 'usuarios',
       // component: UsuariosComponent,
       // canActivate: [ AdminGuard ],
    //    data: { titulo: 'Mantenimiento de Usuarios' }
  //  },
    //{ path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
    //{ path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos' } },
    //{ path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Médico' } },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
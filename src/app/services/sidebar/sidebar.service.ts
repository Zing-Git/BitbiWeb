import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Home',
      icono: 'mdi mdi-gauge',
      url: '/dashboard',
      submenu: [
        { titulo: 'Clientes', icono: 'fas fa-ankh',url: '/inicio-clientes' },
        { titulo: 'Pedidos', icono: 'fas fa-ankh',url: '/pedidos' },
        { titulo: 'Producto', icono: 'fas fa-ankh',url: '/producto' },  //listadoProducto
        { titulo: 'Listado Productos', icono: 'fas fa-ankh',url: '/listado-producto' },  //listadoProducto
        { titulo: 'Gráficas', icono: 'fas fa-ankh',url: '/graficas1' },
        { titulo: 'Progress', icono: 'fas fa-ankh',url: '/progress' },
        { titulo: 'Carga de Productos',  icono: 'fas fa-ankh',url: '/carga-producto' }
      ]
    }

  ];

  otroMenu: any =[
    { titulo: 'Principal', icono: 'fas fa-ankh', url: '/dashboard' },
        { titulo: 'Pedidos', icono: 'fas fa-ankh', url: '/pedidos' },
        { titulo: 'Producto', icono: 'fas fa-ankh', url: '/producto' },
        { titulo: 'Listado de Productos', icono: 'fas fa-ankh', url: '/listado-producto' },
        { titulo: 'Gráficas', icono: 'fas fa-ankh', url: '/graficas1' },
        { titulo: 'Progress', icono: 'fas fa-ankh', url: '/progress' },
        { titulo: 'Carga de Productos', icono: 'fas fa-ankh', url: '/carga-producto' }
  ]
  constructor() { }
  
  getMenu(): any {
    return this.menu;
  }
  getOtroMenu():any{
    return this.otroMenu;
  }
}

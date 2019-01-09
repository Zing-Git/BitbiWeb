import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Principal', url: '/dashboard' },
        { titulo: 'Pedidos', url: '/pedidos' },
        { titulo: 'Producto', url: '/producto' },
        { titulo: 'Gráficas', url: '/graficas1' },
        { titulo: 'Progress', url: '/progress' }
      ]
    }

  ];
  constructor() { }
  
  getMenu(): any {
    return this.menu;
  }
}

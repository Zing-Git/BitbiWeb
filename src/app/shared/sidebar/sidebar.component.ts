import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/service.index';
import { SidebarService } from './../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(public sidebarServices: SidebarService,
     public loginServices: LoginService) { }

  ngOnInit() {
  }

}

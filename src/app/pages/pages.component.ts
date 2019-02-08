import { Component, OnInit } from '@angular/core';
//declare function init_plugins();
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() {
    setTheme('bs3'); // or 'bs4'
    
  }

  ngOnInit() {
    //init_plugins();
  }

}
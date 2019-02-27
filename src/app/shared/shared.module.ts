import { NgModule } from '@angular/core';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubheaderComponent } from './subheader/subheader.component';

@NgModule({
    declarations: [
     
      NopagefoundComponent,
      HeaderComponent,
      SidebarComponent,
      BreadcrumbsComponent,
      SubheaderComponent,
     
     
    ],
    exports: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
    ],
    imports:[RouterModule, CommonModule]
  })
  export class SharedModule { }
  
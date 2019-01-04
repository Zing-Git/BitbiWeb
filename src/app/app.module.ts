import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

//import { MaterialModule } from './1material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './login/register.component';
import { PagesModule } from './pages/pages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServiceModule } from './services/service.module';
import { SharedModule } from './shared/shared.module';
import { PagesComponent } from './pages/pages.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
    /*NopagefoundComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,*/


  ],
  imports: [
  
  BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule,

    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule
    //MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

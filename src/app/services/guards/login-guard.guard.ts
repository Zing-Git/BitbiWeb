import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(private loginServices: LoginService, private router: Router){

  }
  canActivate( ){
    if(this.loginServices.estaLogeado()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.auth.loggedIn[0]==true){
      return this.router.parseUrl("/userdashboard")
    }
    else if(this.auth.loggedIn[1]==true){
      return this.router.parseUrl("/organisationdashboard")
    }
    else if(this.auth.loggedIn[2]==true){
      return this.router.parseUrl("/admin-dashboard")
    }
    else{
      return true
    }
  }
  constructor(private auth:JwtService,private router:Router){

  }
}

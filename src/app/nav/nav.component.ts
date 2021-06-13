import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JwtService } from '../service/jwt.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public isSideNavRequired: boolean = false;
  public isLoggedIn:boolean=false;
  public subscription = new Subscription();
  constructor(private jwt:JwtService,private router:Router) { }

  ngOnInit(): void {
    this.isLoggedIn=this.jwt.loggedIn
    this.subscription.add(this.jwt.isloggedInObserver.subscribe(res=>{
      if(res) {
        this.isLoggedIn= true
      }
    }))
  }
  logout(){
    this.jwt.logout();
    this.isLoggedIn=this.jwt.loggedIn
    this.router.navigate(['/'])
  }
}

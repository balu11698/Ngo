import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from '../service/jwt.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public isSideNavRequired: boolean = false;
  public isLoggedIn:boolean=false;
  constructor(private jwt:JwtService,private router:Router) { }

  ngOnInit(): void {
    this.isLoggedIn=this.jwt.loggedIn
  }
  logout(){
    this.jwt.logout();
    window.location.reload();
    this.router.navigate(['/Home'])
  }

}

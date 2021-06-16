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
  public isLoggedIn: boolean[] = [];
  public isPersonalUserLoggedIn: boolean = false;
  public isOraganisationUserLoggedIn: boolean = false;
  public subscription = new Subscription();
  constructor(private jwt: JwtService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.jwt.loggedIn
    // this.isPersonalUserLoggedIn = this.jwt.loggedIn[0]
    // this.isOraganisationUserLoggedIn = this.jwt.organisationLoggedIn
    this.subscription.add(this.jwt.isloggedInListener.subscribe(res => {
      if (res=="Personal") {
        this.isLoggedIn = [true,false,false]
      }
      else if(res == "Organisation"){
        this.isLoggedIn = [false,true,false]
      }
      else{
        this.isLoggedIn=[false,false,true]
      }
    }))
    // this.subscription.add(this.jwt.isUserloggedInListener.subscribe(res => {
    //   if (res == "Personal") {
    //     // localStorage.setItem('user', "hi");
    //     this.isPersonalUserLoggedIn = true;
    //   }
    //   else {
    //     this.isOraganisationUserLoggedIn = true;
    //     // localStorage.setItem('organisation', "hi");
    //     // console.log(this.isOraganisationUserLoggedIn,"org")
    //   }
    // }))
  }
  // userLogout() {
  //   this.jwt.userLogout();
  //   // this.isPersonalUserLoggedIn = this.jwt.userLoggedIn;
  //   // this.isOraganisationUserLoggedIn = this.jwt.organisationLoggedIn;
  //   this.router.navigate(['/']);
  // }
  logout() {
    this.jwt.logout();
    this.isLoggedIn = this.jwt.loggedIn;
    this.router.navigate(['/']);
  }
}

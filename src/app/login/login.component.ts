import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { JwtService } from '../service/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup
  errorMessage:string=""

  constructor(private formBuilder: FormBuilder,private auth:JwtService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email:[''],
        password:['']
      }
    )
  }
  login(){
   this.errorMessage=""
   this.auth.login(this.loginForm.value).subscribe((success)=>{
     //add the route to the admin dashboard component
     console.log("hi")
     this.router.navigate(['/admin-dashboard'])

   },(error)=>{
     this.errorMessage="Username or Password is incorrect"
   })
  }
}

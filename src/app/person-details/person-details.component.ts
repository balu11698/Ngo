import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ApiService } from '../service/api.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {

  public personDetailsForm!:FormGroup

  constructor(private formBuilder : FormBuilder,private api:ApiService,private snackBar: MatSnackBar,private router:Router) { }

  ngOnInit(): void {
    this.personDetailsForm=this.formBuilder.group(
      {
        firstname:['',[Validators.required]],
        middlename:[''],
        lastname:['',[Validators.required]],
        gender:['',[Validators.required]],
        age:['',[Validators.required]],
        idType:['',[Validators.required]],
        idNumber:['',[Validators.required]],
        occupation:[''],
        skills:[''],
        address:['',[Validators.required]],
        city:['',[Validators.required]],
        district:['',[Validators.required]],
        state:['',[Validators.required]],
        pincode:['',[Validators.required]],
        email:[''],
        phonenumber:[''],
        associated_ngo:[''],
        affectedDate:[''],
        affectedReason:['',[Validators.required]],
        additionalDetail:[''],
        submitterDetail:['',[Validators.required]],
        submitterName:['',[Validators.required]],
        submitterContact:['',[Validators.required]]
      }
    )
  }
 
  detailsSubmit(){
    console.log(this.personDetailsForm.value)
    this.api.createNewCase(this.personDetailsForm.value).subscribe((success:any)=>{
      this.snackBar.open(success.message,'Close',{duration: 3000});
      // this.personDetailsForm.reset();
      console.log(success);
      setTimeout(function(){window.location.reload()},3000)
      // this.personDetailsForm.markAsUntouched();
      // this.personDetailsForm.markAsPristine();
      // this.personDetailsForm.updateValueAndValidity();
      // console.log(this.personDetailsForm.value,"after reset")
    },(error)=>{
      //add code to display error notification
      console.log(error)
      setTimeout(function(){window.location.reload()},3000)
      
    })
    // this.personDetailsForm.reset();
    // console.log(this.personDetailsForm.value,"after reset")
    
  }
}

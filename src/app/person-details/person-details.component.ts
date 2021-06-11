import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {

  public personDetailsForm!:FormGroup

  constructor(private formBuilder : FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.personDetailsForm=this.formBuilder.group(
      {
        firstname:[''],
        middlename:[''],
        lastname:[''],
        gender:[''],
        age:[''],
        idType:[''],
        idNumber:[''],
        occupation:[''],
        skills:[''],
        address:[''],
        city:[''],
        district:[''],
        state:[''],
        pincode:[''],
        email:[''],
        phonenumber:[''],
        associated_ngo:[''],
        affectedDate:[''],
        affectedReason:[''],
        additionalDetail:[''],
        submitterDetail:['']
      }
    )
  }
  detailsSubmit(){
    console.log(this.personDetailsForm.value)

    this.api.createNewCase(this.personDetailsForm.value).subscribe((success)=>{
      //add code to display success notification
      console.log(success)
    },(error)=>{
      //add code to display error notification
      console.log(error)
    })
  }
}

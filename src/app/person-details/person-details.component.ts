import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {

  public personDetailsForm!:FormGroup

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.personDetailsForm=this.formBuilder.group(
      {
        firstname:[''],
        middlename:[''],
        lastname:[''],
        gender:[''],
        age:[''],
        idType:[''],
        idNumbee:[''],
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
        additionalDetai:[''],
        submitterDetail:['']
      }
    )
  }
  detailsSubmit(){
    console.log(this.personDetailsForm.value)
  }
}

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

    this.api.createNewCase(this.personDetailsForm.value).subscribe((success)=>{
      //add code to display success notification
      console.log(success)
    },(error)=>{
      //add code to display error notification
      console.log(error)
    })
  }
}

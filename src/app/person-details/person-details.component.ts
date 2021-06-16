import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
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

  public personDetailsForm!: FormGroup
  public stateArray = ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu",
    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra",
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttaranchal", "Uttar Pradesh", "West Bengal"];

  constructor(private formBuilder: FormBuilder, private api: ApiService, private snackBar: MatSnackBar, private router: Router) { }

  @ViewChild('form') personDetailsFormDirective: any;

  ngOnInit(): void {
    this.personDetailsForm = this.formBuilder.group(
      {
        firstname: ['', [Validators.required]],
        middlename: [''],
        lastname: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        age: ['', [Validators.required]],
        idType: ['NA'],
        idNumber: ['NA'],
        occupation: ['', Validators.required],
        skills: [''],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        district: ['', [Validators.required]],
        state: ['', [Validators.required]],
        pincode: ['', [Validators.required]],
        email: [''],
        phonenumber: [''],
        associated_ngo: [''],
        affectedDate: [''],
        affectedReason: ['', [Validators.required]],
        additionalDetail: [''],
        submitterDetail: ['', [Validators.required]],
        submitterName: ['', [Validators.required]],
        submitterContact: ['', [Validators.required]]
      }
    )
  }

  detailsSubmit() {

    this.api.createNewCase(this.personDetailsForm.value).subscribe((success: any) => {
      this.snackBar.open(success.message, 'Close', { duration: 3000 });
      this.personDetailsFormDirective.resetForm();
    }, (error: any) => {
      //add code to display error notification
      this.snackBar.open(error.message, 'Close', { duration: 3000 });
    })

  }
}

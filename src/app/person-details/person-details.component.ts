import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../service/api.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {

  public formData = new FormData();
  public isMobile: boolean = false;
  public personDetailsForm!: FormGroup
  public fileName: any
  public stateArray = ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu",
    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra",
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttaranchal", "Uttar Pradesh", "West Bengal"];

  constructor(private breakpointObserver: BreakpointObserver, private formBuilder: FormBuilder, private api: ApiService, private snackBar: MatSnackBar, private router: Router) {
    breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }



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
        submitterContact: ['', [Validators.required]],
        resume: this.formBuilder.array([])
      }
    )
  }

  async detailsSubmit() {
    await this.convertFormData()
    this.api.submitCase(this.formData).subscribe((success: any) => {
      this.snackBar.open(success.message, 'Close', { duration: 3000 });
      this.fileName = null;
      this.formData.forEach((value, key) => {
        this.formData.delete(key)
      });
      this.personDetailsFormDirective.resetForm();
    }, (error: any) => {
      this.snackBar.open(error.error.message, 'Close', { duration: 3000 });
    })

  }
  async convertFormData() {
    Object.keys(this.personDetailsForm.value).forEach(key => {
      if (this.personDetailsForm.value[key] === null) {
        this.formData.set(key, '');
      }
      else {
        this.formData.set(key, this.personDetailsForm.value[key]);
      }
    });
    this.formData.set('resume', this.fileName);

  }
  openFile() {
    let uploadFile: HTMLElement = document.getElementsByClassName('uploadFile')[0] as HTMLElement;
    uploadFile.click()
  }
  get tagsArr() {
    return this.personDetailsForm.get('resume') as FormArray;
  }
  async handle(e: any) {
    const file: File = e.target.files[0]
    this.fileName = file;
  }
}

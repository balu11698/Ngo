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

  fileName: any

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
    console.log(this.formData.get('resume'), "form")
    this.api.submitCase(this.formData).subscribe((success: any) => {
      this.snackBar.open(success.message, 'Close', { duration: 3000 });
      this.personDetailsFormDirective.resetForm();
    }, (error: any) => {
      //add code to display error notification
      this.snackBar.open(error.error.message, 'Close', { duration: 3000 });
    })

  }
  async convertFormData() {
    Object.keys(this.personDetailsForm.value).forEach(key => {
      this.formData.append(key, this.personDetailsForm.value[key]);
    });
    console.log(this.formData.get('idType'), "id")
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
    //  console.log(file)

    // console.log(this.personDetailsForm.value)
    if (file) {
      this.fileName = file;
      //  console.log(this.fileName)
      this.formData.set('resume', this.fileName);
      this.tagsArr.push(
        this.formBuilder.group({
          resume: this.formData
        })
      )
      // await this.convertFormData()
      // console.log(this.formData.get('resume'), "form")
      // this.api.submitCase(formData).subscribe((success: any) => {
      //   this.snackBar.open(success.message, 'Close', { duration: 3000 });
      //   this.personDetailsFormDirective.resetForm();
      // }, (error: any) => {
      //   //add code to display error notification
      //   this.snackBar.open(error.error.message, 'Close', { duration: 3000 });
      // })
      //  const control = <FormArray>this.personDetailsForm.controls['resume'];
      //  control.push(this.personDetailsForm.control(this.personDetailsForm.get('stepTextArea').value))
      // control.push(this.fileName)
      // console.log(this.fileName)

      //  formData.append("resume", file);



      // console.log(formData,'data');
      // console.log(formData.get('resume'),"form")

      //  console.log(formData.get('resume'),"form")
      //  console.log(formData.get('firstname'),"form")
      //  this.personDetailsForm.p
      //  this.api.uploadFile(formData).subscribe((success)=>{
      //  })
    }
  }
}

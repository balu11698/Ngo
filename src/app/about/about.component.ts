import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms'
import { MatSnackBar } from "@angular/material/snack-bar";
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})


export class AboutComponent implements OnInit {
  feedbackForm !: FormGroup
  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar,private api:ApiService) { }

  ngOnInit(): void {
    this.formInitialize();
  }
  formInitialize(){
    this.feedbackForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        rating: ['', [Validators.required]],
        feedbackComment: ['', [Validators.required]]
      }
    )
  }
  async setValidators(){
    this.feedbackForm.get('Name')?.setValidators([Validators.required]);
    this.feedbackForm.updateValueAndValidity();
  }
   clearValidatorsForms(feedbackForm:FormGroup){
    Object.keys(feedbackForm.controls).forEach((key: any) => {
      feedbackForm.get(key)?.setErrors(null);
    });
  }
  async submitFeedback() {
    
    this.api.submitFeedback(this.feedbackForm.value).subscribe((success)=>{
      this.snackBar.open('Successfully submitted the feedback', 'Close', { duration: 3000 });
     
      this.feedbackForm.reset();
      this.clearValidatorsForms(this.feedbackForm)
    },(error)=>{
      this.snackBar.open('Error while submitting the feedback', 'Close', { duration: 3000 });
      
  
    })
    // await this.clearValidators(feedbackForm)
    // await this.setValidators()
    // this.feedbackForm.get('Name')?.markAsUntouched();
    // this.feedbackForm.get('Email')?.markAsUntouched();
    // this.feedbackForm.updateValueAndValidity();
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms'
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})


export class AboutComponent implements OnInit {
  feedbackForm !: FormGroup
  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group(
      {
        Name: ['', [Validators.required]],
        Email: ['', [Validators.required, Validators.email]],
        Rating: ['', [Validators.required]],
        feedbackComment: ['', [Validators.required]]
      }
    )
  }
  async setValidators(){
    this.feedbackForm.get('Name')?.setValidators([Validators.required]);
    this.feedbackForm.updateValueAndValidity();
  }
  async clearValidators(feedbackForm:FormGroup){
    Object.keys(feedbackForm.controls).forEach((key: any) => {
      feedbackForm.get(key)?.setErrors(null);
    });
  }
  async submitFeedback() {
    this.snackBar.open('Successfully added', 'Close', { duration: 3000 });
    console.log(this.feedbackForm.value);
    this.feedbackForm.reset();
    // await this.clearValidators(feedbackForm)
    // await this.setValidators()
    // this.feedbackForm.get('Name')?.markAsUntouched();
    // this.feedbackForm.get('Email')?.markAsUntouched();
    // this.feedbackForm.updateValueAndValidity();
  }

}

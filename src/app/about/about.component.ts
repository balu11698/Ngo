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
  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private api: ApiService) { }
  @ViewChild('form') feedBackFormDirective: any;
  ngOnInit(): void {
    this.formInitialize();
  }
  formInitialize() {
    this.feedbackForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        rating: ['', [Validators.required]],
        feedbackComment: ['', [Validators.required]]
      }
    )
  }
  async submitFeedback() {
    this.api.submitFeedback(this.feedbackForm.value).subscribe((success) => {
      this.snackBar.open('Successfully submitted the feedback', 'Close', { duration: 3000 });
      this.feedBackFormDirective.resetForm();
    }, (error) => {
      this.snackBar.open('Error while submitting the feedback', 'Close', { duration: 3000 });
    })
  }

}

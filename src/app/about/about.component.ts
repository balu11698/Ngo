import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  feedbackForm !: FormGroup
  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.feedbackForm=this.formBuilder.group(
      {
        Name:[''],
        Email:[''],
        Rating:[''],
        feedbackComment:['']
      }
    )
  }
  submitFeedback(){
    console.log(this.feedbackForm.value)
  }

}

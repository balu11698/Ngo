import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  feedbackData!:any[]
  public loader = false;
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.loader=true;
    this.api.viewData().subscribe((data:any)=>{
      this.feedbackData=data;
      this.loader=false;
    })
  }

}

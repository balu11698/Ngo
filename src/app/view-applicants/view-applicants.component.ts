import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-view-applicants',
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.scss']
})
export class ViewApplicantsComponent implements OnInit {

  public applicantsForJob!: any
  public subscription = new Subscription
  public jobId!:any;
  public checked =  './../assets/checked.png'
  public unchecked =  './../assets/unchecked.png'

  constructor(private api: ApiService, private router: Router,private activatedRoute:ActivatedRoute,private snackBar:MatSnackBar) {  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.jobId=params.jobId;
    })
    this.viewApplicants();
    // console.log(this.api.data)
    // this.subscription.add(this.api.apiDataListener.subscribe(res => {console.log(res)}))
  }
  viewApplicants() {
    let organisationId = JSON.parse(atob((""+localStorage.getItem("access_token")).split(".")[1])).user.id
    this.api.viewApplicants(({'jobId':this.jobId}),organisationId).subscribe((data:any)=>{
      // this.api.viewApplicantsByJob=data;
      this.applicantsForJob=data
      console.log(this.applicantsForJob)
    })
  }
  acceptApplicant(applicationId:any){
    let body = {
      "applicationId":applicationId,
      "status":"Accepted",
      "note":"You are selected"
    }
    let organisationId = JSON.parse(atob((""+localStorage.getItem("access_token")).split(".")[1])).user.id
    this.api.updateApplication(body,organisationId).subscribe((success:any)=>{
      this.snackBar.open(success.message, 'Close', { duration: 3000 });
      this.viewApplicants();
    }),
    ((error:any)=>{
      this.snackBar.open(error.message, 'Close', { duration: 3000 });
    })
  }
  rejectApplicant(applicationId:any){
    let body = {
      "applicationId":applicationId,
      "status":"Rejected",
      "note":"You are Rejected"
    }
    let organisationId = JSON.parse(atob((""+localStorage.getItem("access_token")).split(".")[1])).user.id
    this.api.updateApplication(body,organisationId).subscribe((success:any)=>{
      this.snackBar.open(success.message, 'Close', { duration: 3000 });
      this.viewApplicants();
    }),
    ((error:any)=>{
      this.snackBar.open(error.message, 'Close', { duration: 3000 });
    })
  }
}

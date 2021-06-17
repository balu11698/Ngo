import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../service/api.service';
import { applicantDetails } from '../service/interface';

@Component({
  selector: 'app-view-applicants',
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.scss']
})
export class ViewApplicantsComponent implements OnInit {

  public applicantsForJob:applicantDetails[]=[]
  public subscription = new Subscription
  public jobId!: any;
  public checked = './../assets/checked.png'
  public unchecked = './../assets/unchecked.png'
  public loader:boolean=false;

  constructor(private api: ApiService, private route: Router, private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar) { }

  async ngOnInit(): Promise<void> {
    this.loader=true
    await this.jobIdParams();
    await this.viewApplicants();
    // console.log(this.api.data)
    // this.subscription.add(this.api.apiDataListener.subscribe(res => {console.log(res)}))
  }
  async jobIdParams() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.jobId = params.jobId;
    })
  }
  async viewApplicants() {
    let organisationId = JSON.parse(atob(("" + localStorage.getItem("access_token")).split(".")[1])).user.id
    this.api.viewApplicants(({ 'jobId': this.jobId }), organisationId).subscribe((data: any) => {
      this.applicantsForJob = data
      this.loader=false;
    })
  }
  acceptApplicant(applicationId: any) {
    let body = {
      "applicationId": applicationId,
      "status": "Accepted",
      "note": "You are selected"
    }
    let organisationId = JSON.parse(atob(("" + localStorage.getItem("access_token")).split(".")[1])).user.id
    this.api.updateApplication(body, organisationId).subscribe((success: any) => {
      this.snackBar.open(success.message, 'Close', { duration: 3000 });
      this.viewApplicants();
    }),
      ((error: any) => {
        this.snackBar.open(error.message, 'Close', { duration: 3000 });
      })
  }
  rejectApplicant(applicationId: any) {
    let body = {
      "applicationId": applicationId,
      "status": "Rejected",
      "note": "You are Rejected"
    }
    let organisationId = JSON.parse(atob(("" + localStorage.getItem("access_token")).split(".")[1])).user.id
    this.api.updateApplication(body, organisationId).subscribe((success: any) => {
      this.snackBar.open(success.message, 'Close', { duration: 3000 });
      this.viewApplicants();
    }),
      ((error: any) => {
        this.snackBar.open(error.message, 'Close', { duration: 3000 });
      })
  }
  back() {
    this.route.navigate(['/organisationdashboard'])
  }
}

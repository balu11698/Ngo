import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-organisation-dashboard',
  templateUrl: './organisation-dashboard.component.html',
  styleUrls: ['./organisation-dashboard.component.scss']
})
export class OrganisationDashboardComponent implements OnInit {

  organisationJobs!: any;
  activeJobs!: any;
  inactiveJobs!: any;
  isChecked = true

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private api: ApiService, private route: Router) { }

  ngOnInit(): void {
    this.viewJobs();
  }

  viewJobs() {
    let id = JSON.parse(atob(("" + localStorage.getItem("access_token")).split(".")[1])).user.id
    this.api.viewJobs(id).subscribe((data: any) => {
      this.organisationJobs = data;
      this.activeJobs = this.organisationJobs.filter((items: any) => {
        return items.active == "Y";
      })
      this.inactiveJobs = this.organisationJobs.filter((items: any) => {
        return items.active == "N";
      })
    })

  }
  viewApplicants(jobId: any) {
    this.route.navigate(['applicants'], { queryParams: { jobId } })
  }
  deleteJob(jobId: any) {
    let organisationId = JSON.parse(atob(("" + localStorage.getItem("access_token")).split(".")[1])).user.id
    this.api.deleteJob(({ 'jobId': jobId }), organisationId).subscribe((success: any) => {
      this.viewJobs();
      this.snackBar.open(success.message, 'Close', { duration: 3000 });
    })
  }
  submitJob() {
    const dialogRef = this.dialog.open(OrganisationDashboardSubmitJobDialog, {
      // data: { details: personDetail }
      width: '400px',
      autoFocus: false,
      maxHeight: '90vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        let id = JSON.parse(atob(("" + localStorage.getItem("access_token")).split(".")[1])).user.id
        this.api.postJob(result, id).subscribe((success: any) => {
          this.viewJobs();
          this.snackBar.open(success.message, 'Close', { duration: 3000 });
        }),
          (error: any) => {
            this.snackBar.open(error.message, 'Close', { duration: 3000 });
          }
        // this.snackBar.open(success.message, 'Close', { duration: 3000 });
      }
      // this.snackBar.open("Email successfully sent", 'Close', { duration: 3000 });
    });
  }

}

@Component({
  selector: 'organisation-dashboard-submit-job',
  templateUrl: 'organisation-dashboard-submit-job.html',
  styleUrls: ['./organisation-dashboard-submit-job.scss']
})
export class OrganisationDashboardSubmitJobDialog {

  jobForm !: FormGroup;
  confirmPasswordError: string = "";
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<OrganisationDashboardSubmitJobDialog>,
    @Inject(MAT_DIALOG_DATA) public data: "") { }

  ngOnInit(): void {
    this.jobForm = this.formBuilder.group(
      {
        jobName: ['', [Validators.required]],
        jobDescription: ['', [Validators.required]],
        jobLocation: ['', [Validators.required]],
        jobType: ['', [Validators.required]],
        workingType: ['', Validators.required],
        otherDetails: ['', [Validators.required]],
      },
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  signUp() {
  }
}
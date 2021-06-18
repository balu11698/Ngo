import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-application-status',
  templateUrl: './application-status.component.html',
  styleUrls: ['./application-status.component.scss']
})
export class ApplicationStatusComponent implements OnInit {

  public userJobs!: any;
  public appliedJobs!: any;
  public withdrawnJobs!: any;
  public isChecked: boolean = true;
  public loader = false;
  constructor(private api: ApiService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loader=true;
    this.viewUserJobs();
  }

  viewUserJobs() {
    let userId = JSON.parse(atob(("" + localStorage.getItem("access_token")).split(".")[1])).user.id
    this.api.viewUserJobs(userId).subscribe((data: any) => {
      this.userJobs = data
      // console.log(this.userJobs)
      this.appliedJobs = this.userJobs.filter((items: any) => {
        return items.withdraw == "N";
      })
      // console.log(this.appliedJobs)
      this.withdrawnJobs = this.userJobs.filter((items: any) => {
        return items.withdraw == "Y";
      })
      this.loader=false;
    })
  }
  withdrawJob(applyId: any) {
    let userId = JSON.parse(atob(("" + localStorage.getItem("access_token")).split(".")[1])).user.id
    this.api.withdrawJob({ 'applyId': applyId }, userId).subscribe((success: any) => {
      this.snackBar.open(success.message, 'Close', { duration: 3000 });
      this.viewUserJobs();
    },
      ((error: any) => {
        this.snackBar.open(error.error.message, 'Close', { duration: 3000 });
      })
    )
  }
}

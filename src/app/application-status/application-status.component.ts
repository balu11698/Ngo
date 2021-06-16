import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-application-status',
  templateUrl: './application-status.component.html',
  styleUrls: ['./application-status.component.scss']
})
export class ApplicationStatusComponent implements OnInit {

  public userJobs!:any;
  public isChecked:boolean=true;
  constructor(private api:ApiService,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.viewUserJobs();
  }

  viewUserJobs(){
    let userId = JSON.parse(atob((""+localStorage.getItem("access_token")).split(".")[1])).user.id
    this.api.viewUserJobs(userId).subscribe((data:any)=>{
      this.userJobs=data
    })
  }
  withdrawJob(applyId:any){
    let userId = JSON.parse(atob((""+localStorage.getItem("access_token")).split(".")[1])).user.id
    this.api.withdrawJob({'applyId':applyId},userId).subscribe((success:any)=>{
      this.snackBar.open(success.message, 'Close', { duration: 3000 });
      this.viewUserJobs();
    }),
    (error:any)=>{
      this.snackBar.open(error.message, 'Close', { duration: 3000 });
    }
  }
}

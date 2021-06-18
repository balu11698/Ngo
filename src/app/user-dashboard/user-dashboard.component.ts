import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  public allJobs!:any
  public jobLocationArray!:any;
  public jobLocation!:string;
  public workingTypeArray!:any;
  public workingType!:string;
  public jobTypeArray!:any;
  public jobType!:string;
  public loader = false;
  constructor(private api:ApiService,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.loader=true;
    this.getAllJobs()
  }
  getAllJobs(){
    this.api.getAllJobs().subscribe((data:any)=>{
      this.allJobs=data
      this.jobLocationArray = [...new Set(this.allJobs.map((item:any) => item.jobLocation))];
      this.workingTypeArray = [...new Set(this.allJobs.map((item:any) => item.workingType))];
      this.jobTypeArray = [...new Set(this.allJobs.map((item:any) => item.jobType))];
      this.loader=false
      // console.log(this.allJobs)
    })
  }
  applyJob(jobId:any){
    let userId = JSON.parse(atob((""+localStorage.getItem("access_token")).split(".")[1])).user.id
    this.api.applyJob({'jobId':jobId},userId).subscribe((success:any)=>{
      this.snackBar.open(success.message, 'Close', { duration: 3000 });
    },
    ((error:any)=>{
      this.snackBar.open(error.error.message, 'Close', { duration: 3000 });
    }))
  }
}

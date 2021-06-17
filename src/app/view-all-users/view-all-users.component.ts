import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.scss']
})
export class ViewAllUsersComponent implements OnInit {

  public allUsers: any;
  public allJobs:any;
  public allPersonalUsers:any;
  public allOrganisationUsers: any;
  public userType = "";
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }
  getAllUsers() {
    this.api.getAllData().subscribe((success: any) => {
      this.allJobs = success[0].jobDetails;
      this.allUsers = success[0].usersDetails;
      this.allPersonalUsers = (this.allUsers).filter((items:any)=>{
        return items.accountType=="Personal"
      })
      this.allOrganisationUsers = this.allUsers.filter((items:any)=>{
        return items.accountType=="Organisation"
      })
      console.log(this.allOrganisationUsers)
    })
  }
  downloadResume(id: any) {
    // let userId = JSON.parse(atob((""+localStorage.getItem('access_token')).split(".")[1])).user.id 
    this.api.downloadResume(id).subscribe((data: any) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = fileURL;
      a.target = '_blank';
      a.download = 'resume.pdf';
      document.body.appendChild(a);
      a.click();
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {

  public allPersonalUsers!: any;
  public loader = false;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loader=true;
    this.getAllPersonalUsers()
  }
  getAllPersonalUsers() {
    this.api.getAllPersonalUsers().subscribe((data: any) => {
      this.allPersonalUsers = data;
      this.loader=false;
      // console.log(this.allPersonalUsers)
    })
  }
  downloadResume(id: any) {
    // tlet userId = JSON.parse(atob((""+localStorage.getItem('access_token')).split(".")[1])).user.id 
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

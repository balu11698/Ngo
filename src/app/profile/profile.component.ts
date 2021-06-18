import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { colorSets } from '@swimlane/ngx-charts';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  fileUrl:any;
  fileName='';
  profileData:any;
  isEdit=false;
  phonenumber="";
  constructor(private api:ApiService,private sanitizer:DomSanitizer,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.getProfileDetails()
  }
  getProfileDetails(){
    this.api.getProfile().subscribe((data:any)=>{
      this.profileData=data;
      this.phonenumber=this.profileData.phonenumber
      // console.log(this.profileData)
    })
  }
  openFile(){
   let uploadFile: HTMLElement = document.getElementsByClassName('uploadFile')[0] as HTMLElement;
   uploadFile.click()
  }
  handle(e:any){
    const file : File = e.target.files[0]
    if(file){
      this.fileName = file.name;
      // console.log(this.fileName)
      const formData = new FormData();
      formData.append("resume", file);
      // console.log(formData.get('resume'),"form")
      this.api.uploadFile(formData).subscribe((success)=>{
        this.getProfileDetails()
      })
    }
  }
  download(){
    let userId = JSON.parse(atob((""+localStorage.getItem('access_token')).split(".")[1])).user.id 
    this.api.downloadResume(userId).subscribe((data:any)=>{
      const blob = new Blob([data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(blob);
      var a         = document.createElement('a');
      a.href        = fileURL; 
      a.target      = '_blank';
      a.download    = 'resume.pdf';
      document.body.appendChild(a);
      a.click();
      // console.log(data)
    })

    }
    edit(){
      this.isEdit=true
  }
  update(){
    this.isEdit=false
    this.api.updateDetails(this.phonenumber).subscribe((success:any)=>{
      this.snackBar.open(success.message, 'Close', { duration: 3000 });
      this.getProfileDetails();
    },
    ((error:any)=>{
      // console.log(error)
      this.snackBar.open(error.error.message, 'Close', { duration: 3000 });
    })
    )
  }
  cancel(){
    this.isEdit=false
  }

}

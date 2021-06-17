import { Component, OnInit } from '@angular/core';
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
  constructor(private api:ApiService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.getProfileDetails()
  }
  getProfileDetails(){
    this.api.getProfile().subscribe((data:any)=>{
      this.profileData=data;
      console.log(this.profileData)
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
      console.log(this.fileName)
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

}

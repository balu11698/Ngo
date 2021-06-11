import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-admin-dashbord',
  templateUrl: './admin-dashbord.component.html',
  styleUrls: ['./admin-dashbord.component.scss']
})
export class AdminDashbordComponent implements OnInit {

  public maleImage = './../assets/man.svg'
  public femaleImage = './../assets/female.svg'
  public detail!:any;


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getAllDetails().subscribe((data:any)=>{
      this.detail=data;
      console.log(data);
    })
  }
  getDate(date:any){
    let currentDate = new Date(date)
    return currentDate.getDate()+'-'+currentDate.getMonth()+'-'+currentDate.getFullYear();
  }
  resolve(details:any){
    details.isSolved="Yes";
    details.action=""
    this.api.updateCaseDetails(details).subscribe((success)=>{
      console.log(success);
    })
  }
}

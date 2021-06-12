
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  totalCases:number=0;
  resolvedCases:number=0;
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getStats().subscribe((data:any)=>{
     
      for(let i in data){
        this.totalCases+=(data[i]['incomingCases']);
        this.resolvedCases+=(data[i]['resolvedCases']);
      }
    })
  }

}

import { Component, OnInit,Inject } from '@angular/core';
import { ApiService } from '../service/api.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { personDetails } from '../service/interface';


export interface DialogData {
  details: any,
  action:string
}

@Component({
  selector: 'app-admin-dashbord',
  templateUrl: './admin-dashbord.component.html',
  styleUrls: ['./admin-dashbord.component.scss']
})
export class AdminDashbordComponent implements OnInit {

  public maleImage = './../assets/man.svg'
  public femaleImage = './../assets/female.svg'
  public detail: personDetails[]=[];
  public action!:string;
  public openCase!:string;  
  public gender!:string;
  public state!:string;
  public occupation!:string;
  public affectedReason!:string;
  public stateArray!:string[];
  public isLoading:boolean=false;
  public occupationArray = ["School teacher/ Private tutor","IT professional","Small business","Pharma industry professional",
  "Private job","Daily wager","Working in small shops/industries","Mechanic","Plumber","Electrician",
  "Building construction labour","Painter","Fruit/Vegetable/Grocery seller","Student","Other"]
  public affectedReasonArray = ["Financial problem","Medical issues","Emotional trauma","Lost parent(s)","Lost other family member(s)","Lost job","Orphan","Others"]

  constructor(private api: ApiService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoading=true;
    this.api.getAllDetails().subscribe((data:any)=>{
      this.detail=data;
      this.stateArray = [...new Set(this.detail.map(item => item.state))];
      this.isLoading=false;
      
    })
  }
  getDate(date:any){
    let currentDate = new Date(date)
    return currentDate.getDate()+'-'+currentDate.getMonth()+'-'+currentDate.getFullYear();
  }
  resolve(details:any,id:string){
    
    let personDetailsFilter : any=this.detail.filter(obj=>{
      return obj.id==id
    })
  
    const dialogRef = this.dialog.open(AdminDashboardDialog, {
      data: {details:personDetailsFilter[0],action:this.action}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !=undefined){
      personDetailsFilter[0].isSolved="Yes";
      personDetailsFilter[0].action=result;
      this.api.updateCaseDetails(personDetailsFilter[0]).subscribe((success)=>{
       
      })
    }
    });
  }
}
  @Component({
    selector: 'admin-dashboard-dialog',
    templateUrl: 'admin-dashboard-dialog.html',
  })
  export class AdminDashboardDialog {
    constructor(
      public dialogRef: MatDialogRef<AdminDashboardDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }


import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { personDetails } from '../service/interface';
import * as L from 'leaflet';
import { Router } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { MapComponent } from '../map/map.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface DialogData {
  details: any,
  action: string
}
export interface EmailDialogData {
  details:any,
  email: any,
  subject:any,
  text:any
}

@Component({
  selector: 'app-admin-dashbord',
  templateUrl: './admin-dashbord.component.html',
  styleUrls: ['./admin-dashbord.component.scss']
})
export class AdminDashbordComponent implements OnInit {
  public victimLocation:L.LatLngExpression[]=[]
  public locationTitles:string[]=[]
  public maleImage = './../assets/man.svg'
  public femaleImage = './../assets/female.svg'
  public detail: personDetails[] = [];
  public action!: string;
  public openCase!: string;
  public gender!: string;
  public state!: string;
  public occupation!: string;
  public affectedReason!: string;
  public stateArray!: string[];
  public isLoading: boolean = false;
  public occupationArray = ["School teacher/ Private tutor", "IT professional", "Small business", "Pharma industry professional",
    "Private job", "Daily wager", "Working in small shops/industries", "Mechanic", "Plumber", "Electrician",
    "Building construction labour", "Painter", "Fruit/Vegetable/Grocery seller", "Student", "Other"]
  public affectedReasonArray = ["Financial problem", "Medical issues", "Emotional trauma", "Lost parent(s)", "Lost other family member(s)", "Lost job", "Orphan", "Others"]

  constructor(private api: ApiService,public dialog: MatDialog,private snackBar:MatSnackBar,private shared:SharedService,private router:Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.api.getAllDetails().subscribe((data: any) => {
      this.detail = data;
      this.stateArray = [...new Set(this.detail.map(item => item.state))];
      this.isLoading = false;

    })
  }
  getDate(date: any) {
    let currentDate = new Date(date)
    return currentDate.getDate() + '-' + currentDate.getMonth() + '-' + currentDate.getFullYear();
  }
  getMap(location:any){
    this.api.getLatLong(location).subscribe(data=>{
     for ( var i in data){
       this.victimLocation.push([data[i]["lat"],data[i]["lon"]])
       this.locationTitles.push(data[i]["display_name"]);
     }
     this.shared.setVictimLocation(this.victimLocation,this.locationTitles)
     this.router.navigate(['/map'])
    })
  }
  
  
  resolve(personDetail: any) {
    const dialogRef = this.dialog.open(AdminDashboardDialog, {
      data: { details: personDetail, action: this.action }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        console.log(result);
        personDetail.isSolved = 'Yes';
        personDetail.action = result;
        this.api.updateCaseDetails(personDetail).subscribe((success:any) => {
          this.snackBar.open(success.message, 'Close', { duration: 3000 });
        })
      }
    });
  }
  sendEmail(personDetail: any) {
    const dialogRef = this.dialog.open(AdminDashboardEmailDialog, {
      data: { details: personDetail }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.snackBar.open("Email successfully sent", 'Close', { duration: 3000 });
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  selector: 'admin-dashboard-email-dialog',
  templateUrl: 'admin-dashboard-email-dialog.html',
})
export class AdminDashboardEmailDialog {
  sendEmailForm!:FormGroup
  constructor(
    public dialogRef: MatDialogRef<AdminDashboardEmailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EmailDialogData,private formBuilder:FormBuilder) { }
    ngOnInit(): void {
      this.sendEmailForm=this.formBuilder.group({
        email:['',[Validators.required]],
        subject:['',[Validators.required]],
        text:['',Validators.required]
      })
    }
    onNoClick(): void {
    this.dialogRef.close();
  }
}



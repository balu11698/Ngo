import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //  url='http://194.233.64.67:3000/';
  public apiData = new Subject;
  public apiDataListener = this.apiData.asObservable();
  public data!:any;
  viewApplicantsByJob:any;
  geocodingapi='https://nominatim.openstreetmap.org/search?format=json&q='
  url='http://localhost:3000/';
  constructor(private http:HttpClient) { }
  createNewCase(data:any){
    return this.http.post(this.url+'createNewCase',data);
  }
  regiseterUser(data : any){
    return this.http.post(this.url+'register',data);
  }
  postJob(data:any,id:any){
    const authToken=localStorage.getItem('access_token');
    const headers=new HttpHeaders({
      'Authorization':'Bearer '+authToken
    })
    return this.http.post(this.url+'postJob/'+id,data,{headers:headers})
  }
  viewJobs(id:any){
    const authToken=localStorage.getItem('access_token');
    const headers=new HttpHeaders({
      'Authorization':'Bearer '+authToken
    })
    return this.http.get(this.url+'viewJobsByAccount/'+id,{headers:headers})
  }
  viewUserJobs(userId:any){
    const authToken=localStorage.getItem('access_token');
    const headers=new HttpHeaders({
      'Authorization':'Bearer '+authToken
    })
    return this.http.get(this.url+'viewJobsByAccount/'+userId,{headers:headers})
  }
  withdrawJob(jobId:any,userId:any){
    const authToken=localStorage.getItem('access_token');
    const headers=new HttpHeaders({
      'Authorization':'Bearer '+authToken
    })
    return this.http.post(this.url+'withdraw/'+userId,jobId,{headers:headers})
  }
  viewApplicants(jobId:any,organisationId:any){
    const authToken=localStorage.getItem('access_token');
    const headers=new HttpHeaders({
      'Authorization':'Bearer '+authToken
    })
    return this.http.post(this.url+'viewApplicantsByJobId/'+organisationId,jobId,{headers:headers})
  }
  deleteJob(jobId:any,organisationId:any){
    const authToken=localStorage.getItem('access_token');
    const headers=new HttpHeaders({
      'Authorization':'Bearer '+authToken
    })
    return this.http.post(this.url+'deleteJob/'+organisationId,jobId,{headers:headers})
  }
  getAllJobs(){
    const authToken=localStorage.getItem('access_token');
    const headers=new HttpHeaders({
      'Authorization':'Bearer '+authToken
    })
    return this.http.get(this.url+'getAllJobs',{headers:headers})
  }
  applyJob(jobId:any,userId:any){
    const authToken=localStorage.getItem('access_token');
    const headers=new HttpHeaders({
      'Authorization':'Bearer '+authToken
    })
    return this.http.post(this.url+'apply/'+userId,jobId,{headers:headers})
  }
  updateApplication(data:any,userId:any){
    const authToken=localStorage.getItem('access_token');
    const headers=new HttpHeaders({
      'Authorization':'Bearer '+authToken
    })
    return this.http.post(this.url+'updateApplication/'+userId,data,{headers:headers})
  }
  sendEmail(data:any){
    const authToken=localStorage.getItem('access_token');
    const headers=new HttpHeaders({
      'Authorization':'Bearer '+authToken
    })
    return this.http.post(this.url+'sendEmail',data,{headers:headers})
  }
  getAllDetails(){
    const authToken=localStorage.getItem('access_token');
    const headers=new HttpHeaders({
      'Authorization':'Bearer '+authToken
    })
    return this.http.get(this.url+'getAllDetails',{headers:headers})
  }
  getLatLong(location:any){
    
    return this.http.get<any[]>(this.geocodingapi+encodeURIComponent(location));
  }
  updateCaseDetails(data:any){
    const authToken=localStorage.getItem('access_token');
    const headers=new HttpHeaders({
      'Authorization':'Bearer '+authToken
    }) 
    return this.http.post(this.url+'updateCase',data,{headers:headers})
  }
  deleteCase(data:any){
    const authToken=localStorage.getItem('access_token');
    const headers=new HttpHeaders({
      'Authorization':'Bearer '+authToken
    }) 
    return this.http.post(this.url+'deleteCase',data,{headers:headers})
  }
  getStats(){
    return this.http.get(this.url+'getStats')
  }
  submitFeedback(data:any){
  return this.http.post(this.url+'submitForm',data);
  }
  viewData(){
    const authToken=localStorage.getItem('access_token');
    const headers=new HttpHeaders({
      'Authorization':'Bearer '+authToken
    }) 
    return this.http.get(this.url+'viewFeedbackForms',{headers:headers})
  }

  setdata(data:any){
    this.data = data
  }
  public get dataApplied() : any{
    return this.data;
  }
}

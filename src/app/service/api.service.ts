import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //  url='http://194.233.64.67:3000/';
   geocodingapi='https://nominatim.openstreetmap.org/search?format=json&q='
  url='http://localhost:3000/';
  constructor(private http:HttpClient) { }
  createNewCase(data:any){
    return this.http.post(this.url+'createNewCase',data)
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
}

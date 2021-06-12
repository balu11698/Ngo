import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {tap} from 'rxjs/operators';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor(private http: HttpClient) { }
//  url = 'http://194.233.64.67:3000';
 url='http://localhost:3000';
  // loggedin:boolean=false
  public isloggedIn = new Subject();
  public isloggedInObserver = this.isloggedIn.asObservable();
  login(data:any){
    
    return this.http.post<{access_token:string}>(this.url+'/signin',data).pipe(tap(res=>
      {
        // window.location.reload();
        localStorage.setItem('access_token',res.access_token)
      }
      ))
  }
  isTokenCorrect(){
    const authToken=localStorage.getItem('access_token');
  
    const headers=new HttpHeaders({
      'Authorization':'Bearer '+authToken
    }) 
    return this.http.get(this.url+'/tokenCheck',{headers:headers})
  }
  logout(){
    localStorage.removeItem('access_token')
  }
  // public  loggedIn():any{
  //   this.isTokenCorrect().subscribe(data=>{
  //     this.loggedin=true
  //   },(error)=>{
  //     this.loggedin=false
  //   })
  // }
  // public getLoggedinValue(){
  //   this.loggedIn()
  //   return this.loggedin
  // }

  public get loggedIn():boolean{
    return localStorage.getItem('access_token') !== null;
  }
}

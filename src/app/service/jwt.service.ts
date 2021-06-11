import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor(private http: HttpClient) { }
  login(data:any){
    const url = 'http://194.233.64.67:3000';
    return this.http.post<{access_token:string}>(url+'/signin',data).pipe(tap(res=>
      {
        localStorage.setItem('access_token',res.access_token)
      }
      ))
  }
  logout(){
    localStorage.removeItem('access_token')
  }
  public get loggedIn():boolean{
    return localStorage.getItem('access_token')!==null;''
  }
}

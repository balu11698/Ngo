import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor(private http: HttpClient) { }
  //  url = 'http://194.233.64.67:3000';
  url = 'http://localhost:3000';
  // loggedin:boolean=false
  public isloggedIn = new Subject();
  public isloggedInListener = this.isloggedIn.asObservable();
  login(data: any) {

    return this.http.post<{ access_token: string }>(this.url + '/signin', data).pipe(tap(res => {
      // window.location.reload();
      localStorage.setItem('access_token', res.access_token)
    }
    ))
  }
  // userLogin(){
  //   return ;
  // }
  loginUser(data: any) {
    return this.http.post<{ access_token: string }>(this.url + '/loginUser', data).pipe(tap(res => {
      // window.location.reload();
      localStorage.setItem('access_token', res.access_token)
    }
    ))
  }
  isTokenCorrect() {
    const authToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + authToken
    })
    return this.http.get(this.url + '/tokenCheck', { headers: headers })
  }
  logout() {
    localStorage.removeItem('access_token');
  }
  // userLogout(){
  //   localStorage.removeItem('user');
  //   localStorage.removeItem('organisation');
  // }
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

  public get loggedIn(): boolean[] {
    let accessToken = localStorage.getItem('access_token');
    if (accessToken != null) {
      let accountType = JSON.parse(atob(accessToken!.split(".")[1])).user.accountType;
      if (accountType == "Personal") {
        return [true, false, false];
      }
      else if (accountType == "Organisation") {
        return [false, true, false];
      }
      else {
        return [false, false, true];
      }
    }
    else {
      return [false, false, false]
    }
  }
  // public get userLoggedIn():boolean{
  //   return localStorage.getItem('user')!==null;
  // }
  // public get organisationLoggedIn():boolean{
  //   return localStorage.getItem('organisation')!==null;
  // }
}

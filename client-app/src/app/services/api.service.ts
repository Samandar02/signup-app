import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSignIn, UserSignUp, UserVM } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  readonly URL = "https://localhost:7250/Auth/";
  constructor(private http:HttpClient) {

   }
  signUp(user:UserSignUp):Observable<Object>{
    return this.http.post(this.URL+'up',user)
  }
  signIn(user:UserSignIn):Observable<Object>{
    return this.http.post(this.URL,user)
  }
  putUser(user:UserVM):Observable<Object>{
    return this.http.put(this.URL+user.Id,user)
  }
  getMe(id:string){
    return this.http.get(this.URL+id);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSignIn, UserSignUp, UserVM } from '../models/model';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  uploadImg(file: File) {
    return this.http.post(this.URLUploader, file)
  }
  
  readonly URLUploader = "https://localhost:7250/Upload";
  readonly URL = "https://localhost:7250/Auth";
  constructor(private http: HttpClient) {

  }
  getMe() {
    let token = localStorage.getItem('auth_token')
    return this.http.get(this.URL + '/' +
      this.decodeToken(token ?? '')['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
  }
  editUser(user: UserVM): Observable<Object> {
    return this.http.put(this.URL + '/' + user.id, user)
  }
  signUp(user: UserSignUp): Observable<Object> {
    return this.http.post(this.URL + '/' + 'up', user)
  }
  signIn(user: UserSignIn): Observable<Object> {
    return this.http.post(this.URL, user, { responseType: "text" })
  }
  logOut() {
    localStorage.removeItem('auth_token')
  }
  helper = new JwtHelperService();
  isSignedIn() {
    let token = localStorage.getItem('auth_token')
    return this.helper.isTokenExpired(token ?? '');
  }
  decodeToken(token: string) {
    return this.helper.decodeToken(token);
  }

}

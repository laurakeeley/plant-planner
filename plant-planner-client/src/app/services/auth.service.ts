import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BASE_URL } from '../app.constants';
import { map } from 'rxjs/operators';

export const jwtToken = '';
export const userId = '';

// export class LoginResponse {
//   constructor(
//     public message:string,
//     public user_id:number,
//     public status:number,
//     public token:any,
//     public expiration:any
//     ) {}
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private BASE_URL: string = 'http://127.0.0.1:5000';
  // private tokenKey: string = "";
  // private headers: HttpHeaders = new HttpHeaders({"Authorization": `Bearer ${this.tokenKey}`, 'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {}

  signup(user: any) {
    return this.http.post(`${BASE_URL}/sign-up`, user);
  }

  login(email: string, password: string) {
    const data = {email, password};
    return this.http.post<any>(
      `${BASE_URL}/login`, data).pipe(
      map(
        data => {
          sessionStorage.setItem(userId, data.user_id);
          sessionStorage.setItem(jwtToken, `Bearer ${data.token}`);
          return data;
        }
      )
    );
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(userId);
  }

  getAuthToken() {
    if (this.getAuthenticatedUser())
      return sessionStorage.getItem(jwtToken)
    return null
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(userId);
    return !(user === null)
  }

}

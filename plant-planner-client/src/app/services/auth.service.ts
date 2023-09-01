import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
// import { Observable, catchError, tap, throwError } from 'rxjs';

// export class SignupResponse {
//   constructor(
//     public message:string,
//     public userId:number,
//     public status:number,
//     public token:any,
//     public expiration:any
//     ) {}
// }

export class LoginResponse {
  constructor(
    public message:string,
    public user_id:number,
    public status:number,
    public token:any,
    public expiration:any
    ) {}
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL: string = 'http://127.0.0.1:5000';
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private tokenKey: string = "";

  constructor(private http: HttpClient) {}

  signup(user: any) {
    return this.http.post(`${this.BASE_URL}/sign-up`, user);
  }
  
  login(email: string, password: string) {
    const data = {email, password};
    return this.http.post<LoginResponse>(`${this.BASE_URL}/login`, data);
  }
}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL: string = 'http://127.0.0.1:5000';
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {}

  signup(user: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/sign-up`, user);
  }
  
  login(email: string, password: string): Observable<any> {
    const data = {email, password};
    return this.http.post(`${this.BASE_URL}/login`, data);
  }
}

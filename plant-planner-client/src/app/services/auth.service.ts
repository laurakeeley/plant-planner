import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL: string = 'http://127.0.0.1:5000';
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {}

  signup(user: any) {
    return this.http.post(`${this.BASE_URL}/sign-up`, user);
  }

  // register(user): Promise<any> {
  //   let url: string = `${this.BASE_URL}/sign-up`;
  //   return this.http.post(url, user, {headers: this.headers}).toPromise();
  // }

  test(): string {
    return 'the auth test is workinggggg';
  }
}

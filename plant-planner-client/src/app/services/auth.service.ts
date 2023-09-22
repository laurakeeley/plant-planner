import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../env';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export let jwtToken = 'jwtToken';
export let userId = 'userId';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient,
    private router:Router  
  ) {}

  signup(user: any) {
    return this.http.post(`${BASE_URL}/sign-up`, user);
  }

  login(email: string, password: string) {
    const data = {email, password};
    return this.http.post<any>(
      `${BASE_URL}/login`, data).pipe(
      map(
        data => {
          console.log(data);
          sessionStorage.setItem(userId, data.user_id);
          sessionStorage.setItem(jwtToken, `Bearer ${data.token}`);
          return data;
        }
      )
    );
  }

  logout() {
    sessionStorage.removeItem(jwtToken);
    sessionStorage.removeItem(userId);
    jwtToken = "";
    userId = "";
    this.router.navigate(['/login']);
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
    // if (user === null) {
    //   this.router.navigate(['/login']);
    // }

    return !(user === null)
  }

}

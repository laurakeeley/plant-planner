import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../env';
import { map } from 'rxjs/operators';

export const jwtToken = 'jwtToken';
export const userId = 'userId';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

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
          console.log(data);
          sessionStorage.setItem(userId, data.user_id);
          sessionStorage.setItem(jwtToken, `Bearer ${data.token}`);
          return data;
        }
      )
    );
  }

  logout() {
    // return this.http.post<any>(
    //   `${BASE_URL}/logout`).pipe(
    //   map(
    //     data => {
    //       console.log(data);
    //       sessionStorage.setItem(userId, data.user_id);
    //       sessionStorage.setItem(jwtToken, `Bearer ${data.token}`);
    //       return data;
    //     }
    //   )
    // );
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

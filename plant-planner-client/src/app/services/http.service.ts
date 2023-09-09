import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements HttpInterceptor {

  constructor(private auth:AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler){
    let headers = this.auth.getAuthToken();
    let userId = this.auth.getAuthenticatedUser()

    if(headers && userId) { 
      request = request.clone({
        setHeaders : {
            Authorization : headers
          }
        }) 
    }
    return next.handle(request);
  }
}

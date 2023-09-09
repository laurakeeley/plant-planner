import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements HttpInterceptor {

  constructor(private auth:AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler){
    debugger;
    let headers = this.auth.getAuthToken();
    let userId = this.auth.getAuthenticatedUser()

    if(headers && userId) { 
      debugger;
      request = request.clone({
        setHeaders : {
            Authorization : headers
          }
        }) 
    }
    debugger;
    return next.handle(request);
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginImage: string;
  email = "";
  password = "";

  constructor(
    private auth:AuthService,
    private router:Router
  ) {
    this.loginImage = "assets/pexelssamuelcrosland2557232-1@2x.png"
  }
  
  login() {
    this.auth.login(this.email, this.password).subscribe({ 
      next: response => {
        console.log(response);
        this.router.navigate(['/home']);
      }, 
      error: error => {
        console.log(error);
      }
    });
  }
}

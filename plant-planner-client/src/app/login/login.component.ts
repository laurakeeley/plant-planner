import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginImage: string;
  email = "";
  password = "";

  constructor(private auth:AuthService) {
    this.loginImage = "assets/pexelssamuelcrosland2557232-1@2x.png"
  }

  login() {
    this.auth.login(this.email, this.password).subscribe(
      (response) => {
        console.log(response);
        // Handle successful login, e.g., navigate to a different page
      },
      (error) => {
        console.error(error);
        // Handle login error
      }
    )
  }
}

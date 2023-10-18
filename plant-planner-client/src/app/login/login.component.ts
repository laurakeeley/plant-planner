import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginImage: string;
  email = '';
  password = '';
  isPasswordVisible = false;

  constructor(private auth: AuthService, private router: Router) {
    this.loginImage = 'assets/pexelssamuelcrosland2557232-1@2x.png';
  }

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (response) => {
        if ((response.status === 200)) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.log(error);
        let element = document.getElementById('login_error');
        element
          ? element.removeAttribute('hidden')
          : console.log('Element not found.');
      },
    });
  }

  close(id: string) {
    let element = document.getElementById(id);
    element
      ? element.setAttribute('hidden', 'true')
      : console.log('Element not found.');
  }

  passwordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  getInputType() {
    return this.isPasswordVisible ? 'text' : 'password';
  }

  toggleEyeSVG() {
    return this.isPasswordVisible
      ? 'assets/icon--jamicons--outline--logos--eye1.svg'
      : 'assets/icon--jamicons--outline--logos--eye_close.svg';
  }
}

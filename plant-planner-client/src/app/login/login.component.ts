import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { PasswordInputComponent } from '../password-input/password-input.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginImage: string;
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {
    this.loginImage = 'assets/pexelssamuelcrosland2557232-1@2x.png';
  }

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log(response);
        if ((response.status = 200)) {
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
}

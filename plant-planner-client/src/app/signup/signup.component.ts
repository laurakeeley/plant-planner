import { Component } from '@angular/core'; 
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent { 
  newUser = {
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  };
  isPasswordVisible = false;

  constructor(
    private auth:AuthService,
    private router:Router,
    private alert:AlertService
  ) {}

  signup() {
    this.auth.signup(this.newUser).subscribe({
      next: response => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      error: error => {
        console.log(error);
        let element = document.getElementById('signup_error');
        if (element) {
          element.removeAttribute('hidden') ;
          element.classList.add('error-alert');
          this.alert.setTitle("Oops!");
          this.alert.setMessage(error.error.error + '.');
        }
      }
    });
  }

  closeAlert(id: string) {
    this.alert.closeAlert(id);
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

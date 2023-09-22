import { Component } from '@angular/core'; 
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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
  error = '';

  constructor(
    private auth:AuthService,
    private router:Router
  ) {}

  signup() {
    this.auth.signup(this.newUser).subscribe({
      next: response => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      error: error => {
        console.log(error);
        this.error = error.error.error;
        let element = document.getElementById('signup_error');
        element ? element.removeAttribute('hidden') : console.log("Element not found.");
      }
    });
  }

  close(id:string) {
    let element = document.getElementById(id);
    element ? element.setAttribute('hidden', 'true') : console.log('Element not found.');
  }
}

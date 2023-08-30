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
      }
    });
  }
}

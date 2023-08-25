import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
// import { Observable } from 'rxjs';
// import { User } from '../models/user'

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

  constructor(private auth:AuthService) {}

  signup() {
    this.auth.signup(this.newUser).subscribe (
      response => {
        console.log(response);
        // Handle success
      },
      error => {
        console.error(error);
        // Handle error
      }
    );
  }

}

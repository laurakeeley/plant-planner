import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
// import { User } from '../models/user'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit { 
  // user: User = new User();

  constructor(private auth:AuthService) {}
  ngOnInit(): void {
    console.log(this.auth.test());
  }
  // signup() {
  //   console.log("signup() clicked!")
  // }
  // signup(): void {
  //   this.auth.register(this.user)
  //   .then((user) => {
  //     console.log(user.json());
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }

}

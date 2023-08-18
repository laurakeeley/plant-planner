import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginImage: string;

  constructor() {
    this.loginImage = "assets/pexelssamuelcrosland2557232-1@2x.png"
  }
}

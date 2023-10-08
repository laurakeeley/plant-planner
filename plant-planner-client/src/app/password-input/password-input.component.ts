import { Component } from '@angular/core';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css']
})
export class PasswordInputComponent {
  password = '';

  isPasswordVisible = false;

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

  getPassword() {
    return this.password;
  }
}

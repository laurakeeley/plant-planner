import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'plant-planner-client';
  mobileMenuVisible: boolean = false;

  constructor (private auth:AuthService) {}

  toggleMobileMenu(){
    this.mobileMenuVisible = !this.mobileMenuVisible
  }

  // logout() {
  //   this.auth.logout().subscribe({ 
  //     next: response => {
  //       console.log(response);
  //       this.router.navigate(['/login']);
  //     }, 
  //     error: error => {
  //       console.log(error);
  //     }
  //   });
  // }
}

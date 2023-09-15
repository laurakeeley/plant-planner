import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private auth:AuthService) {}

  ngOnInit() {
    this.logout();
  }

   logout() {
    this.auth.logout();
  }
}

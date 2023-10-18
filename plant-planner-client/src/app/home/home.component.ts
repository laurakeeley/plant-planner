import { Component, Injectable } from '@angular/core';
import { PlantDataService } from '../services/plant-data.service';
import { AuthService, userId } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  message = "";
  userPlants: any = {};
  user: any = {};
  private userId = this.auth.getAuthenticatedUser();
  
  constructor(
    private plants:PlantDataService,
    private auth:AuthService,
    private router:Router
  ) {}
    
    
  ngOnInit() {
    this.getUser();
  }
  
  getUser() {
    this.plants.getUser().subscribe({
      next: response => {
        console.log("getUser response: ", response);
        if (!this.auth.isUserLoggedIn()) {
          this.router.navigate(['/login']);
        } else {
          this.userPlants = response.plants_record ? response.plants_record : {};
          this.user = response.user_record ? response.user_record : {};
          console.log(response);
        }
      },
      error: error => {
        console.log(error);
        if (!this.auth.isUserLoggedIn()) {
          this.router.navigate(['/login']);
        }
      }
    })
  }

}

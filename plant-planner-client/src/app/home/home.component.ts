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
  userPlants = {};
  user = {};
  private userId = this.auth.getAuthenticatedUser();
  
  constructor(
    private plants:PlantDataService,
    private auth:AuthService,
    private router:Router
  ) {}
    
    
  ngOnInit() {
    this.getUserPlants(this.userId);
  }

  getUserPlants(userId: any) {
    this.plants.getUserPlants(userId).subscribe({
      next: response => {
        console.log("getUserPlants: ", response);
        if (!this.auth.isUserLoggedIn()) {
          this.router.navigate(['/login']);
        } else {
          // this.userPlants = response;
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

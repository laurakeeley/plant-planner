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
  
  constructor(
    private plants:PlantDataService,
    private auth:AuthService,
    private router:Router
  ) {}
    
    
  ngOnInit() {
    this.getUserPlants();
  }

  getUserPlants() {
    this.plants.getUserPlants(userId).subscribe({
      next: response => {
        console.log(response);
        this.userPlants = response;
        this.message = response.message;
      },
      error: error => {
        console.log(error);
        if (!this.auth.isUserLoggedIn()) {
          this.router.navigate(['/login']);
        }
      }
    })
  }

  // getUser() {
  //   this.plants.getUserPlants(userId).subscribe({
  //     next: response => {
  //       console.log(response);
  //       this.userPlants = response;
  //       this.message = response.message;
  //     },
  //     error: error => {
  //       console.log(error);
  //       if (!this.auth.isUserLoggedIn()) {
  //         this.router.navigate(['/login']);
  //       }
  //     }
  //   })
  // }

}

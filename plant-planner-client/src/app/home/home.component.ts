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
    this.getUser();
  }
  
  // getUser() {
  //   this.plants.getUser().subscribe({
  //     next: response => {
  //       console.log("getUser response: ", response);
  //       // if (!this.auth.isUserLoggedIn()) {
  //       //   this.router.navigate(['/login']);
  //       // } else {
  //       //   // this.userPlants = response;
  //       //   console.log(response);
  //       // }
  //     },
  //     error: error => {
  //       console.log('errors: ', error);
  //       if (!this.auth.isUserLoggedIn()) {
  //         this.router.navigate(['/login']);
  //       }
  //     }
  //   })
  // }

  //chatGPT nonsense
  getUser() {
    this.plants.getUser().subscribe({
      next: response => {
        console.log("getUser response: ", response);
        if (response && response.user_record && response.plants_record) {
          // Data is available, handle it as needed
          this.userPlants = response.plants_record;
        } else {
          // Handle the case when the response data is missing or incorrect
          console.log("Invalid response data.");
        }
      },
      error: error => {
        console.log("Error:", error);
        if (error.status === 401) {
          // Unauthorized error, user is not logged in or token is invalid
          this.router.navigate(['/login']);
        } else {
          // Handle other types of errors
          // You can display an error message or take appropriate actions
        }
      }
    });
  }
  

}

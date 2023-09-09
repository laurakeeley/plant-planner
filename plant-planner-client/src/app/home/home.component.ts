import { Component, Injectable } from '@angular/core';
import { PlantDataService } from '../services/plant-data.service';
import { userId } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  message = "";
  userPlants = {};
  
  constructor(
    private plants:PlantDataService
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
      }
    })
  }

}

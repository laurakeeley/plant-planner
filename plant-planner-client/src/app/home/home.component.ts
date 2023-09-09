import { Component, Injectable } from '@angular/core';
import { PlantDataService } from '../services/plant-data.service';
import { userId } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userPlants = {};
  
  constructor(
    private plants:PlantDataService
  ) {}
    
    
  ngOnInit() {
    debugger;
    this.getUserPlants();
  }

  getUserPlants() {
    debugger;
    this.plants.getUserPlants(userId).subscribe(
      response => {
        console.log(response);
        this.userPlants = response;
      }
    )
  }

}

import { Component, Injectable } from '@angular/core';
import { PlantDataService } from '../services/plant-data.service';
import { AuthService, userId } from '../services/auth.service';
import { Router } from '@angular/router';
import { DetailsModalServiceService } from '../services/details-modal-service.service';
import { SearchDataService } from '../services/search-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  message = "";
  userPlants: any = [];
  user: any = [];
  
  constructor(
    private plants:PlantDataService,
    private auth:AuthService,
    private router:Router,
    private detailsModalService: DetailsModalServiceService
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
          this.userPlants = response.plants_record || [];
          this.plants.setUserPlants(this.userPlants);
          this.user = response.user_record ? response.user_record : [];
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

  showDetails(plantId: number) {
    console.log(plantId);
    this.detailsModalService.toggleLoaderVisiblity();
    this.plants.getPlant(plantId).subscribe({
      next: response => {
        this.detailsModalService.setDetailResults(response.record.details);
        this.detailsModalService.toggleModalVisiblity();
      },
      error: error => {
        console.log(error);
      }
    })
  }

}

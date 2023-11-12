import { Component } from '@angular/core';
import { DetailsModalServiceService } from '../services/details-modal-service.service';
import { PlantDataService } from '../services/plant-data.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})


export class DetailsModalComponent {
  response: any;
  userId = this.auth.getAuthenticatedUser();
  currentRoute = this.router.url;
 
  constructor (
    private detailsModalService: DetailsModalServiceService,
    private plants: PlantDataService,
    private auth: AuthService,
    private router: Router
    ) {
    this.detailsModalService.opened.subscribe(() => { 
      this.loadPlantDetails();
    })
  }
  
  getModalVisiblity() {
    return this.detailsModalService.modalVisibility();
  }
  
  close() {
    this.detailsModalService.modalHidden = true;
  }
  
  loadPlantDetails() {
    this.response = this.detailsModalService.getDetailResults();
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  addPlant(plantObject: any) {
    console.log("details-modal.comp.ts");
    console.log(plantObject);
    this.plants.createPlant(plantObject).subscribe({
      next: response => {
        console.log("addPlant response:");
        console.log(response);
        this.createUserPlant(this.userId, plantObject.id);
        this.close();
      },
      error: error => {
        console.log(error);
        if (error.status === 409) {
          console.log("error: ", error);
          this.createUserPlant(this.userId, plantObject.id);
          this.close();
        } else {
          console.log("error: ", error);
        }
      }
    })
  } 

  createUserPlant(userId: any, plantId: any) {
    this.plants.createUserPlant(userId, plantId).subscribe({
      next: response => {
        console.log("createUserPlant response: ", response);
      }, error: error  => {
        console.log("createUserPlant error: ", error);
      }
    })
  }

  showDetailsButton() {
    return this.currentRoute === '/search'
  }

  showDeleteButton() {
    return this.currentRoute === '/'
  }

  deletePlant(plantId: number) {
    console.log("deleting plant id:", plantId);
    this.plants.deleteUserPlant(plantId).subscribe({
      next: response => {
        if (confirm("Are you sure you want to delete this plant?")) {
          console.log(response);
          this.close();
          this.removePlantFromProfile(plantId);
        }
      }, error: error => {
        console.log(error);
      }
    })
  }

  removePlantFromProfile(plantId: number) {
    this.plants.removePlantFromProfile(plantId);
  }
  
}

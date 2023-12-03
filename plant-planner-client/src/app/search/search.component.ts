import { Component } from '@angular/core';
import { SearchDataService } from '../services/search-data.service';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HARDINESS_ZONE_KEY } from '../env';
import { Router } from '@angular/router';
import { DetailsModalServiceService } from '../services/details-modal-service.service';
import { PlantDataService } from '../services/plant-data.service';
import { AlertService } from '../services/alert.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchResults: any = [];
  userId = this.auth.getAuthenticatedUser();

  constructor(
    private searchData: SearchDataService,
    private auth: AuthService,
    private router: Router,
    private detailsModalService: DetailsModalServiceService,
    private plants: PlantDataService,
    private alert: AlertService
  ) {}

  //banner words
  words: string[] = [
    'Easy care',
    'Help native wildlife',
    'Best plants for you',
  ];
  query: string = '';
  zipCodeResult: any = '';
  isZipCodeValid: boolean = false;
  raiseZipCodeError: boolean = false;
  //filter section
  sunlight = {
    full_shade: false,
    part_shade: false,
    sun_part_shade: false,
    full_sun: false,
  };
  indoor = false;
  hardinessZone = '';
  plant_name = '';
  showAlert = false;

  isUserLoggedIn() {
    if (!this.auth.isUserLoggedIn()) {
      this.router.navigate(['/login']);
    }
    return this.auth.isUserLoggedIn();
  }

  //fetch hardiness zone based on zip code
  getHardinessZone() {
    // validate zipcode
    const zipCodePattern = /^\d{5}(-\d{4})?$/;
    this.isZipCodeValid = zipCodePattern.test(this.hardinessZone);
    console.log(this.hardinessZone);

    const fetchHardiness = async () => {
      const url = `https://plant-hardiness-zone.p.rapidapi.com/zipcodes/${this.hardinessZone}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': HARDINESS_ZONE_KEY,
          'X-RapidAPI-Host': 'plant-hardiness-zone.p.rapidapi.com',
        },
      };
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        this.zipCodeResult = result.hardiness_zone;
        console.log(this.zipCodeResult);
      } catch (error) {
        console.log(error);
      }
    };

    if (this.isZipCodeValid) {
      fetchHardiness();
    } else {
      //send error to user, enter a valid zip code
      if (this.zipCodeResult !== '') {
        this.raiseZipCodeError = true;
        console.log(this.raiseZipCodeError);
      } else {
        console.log(this.raiseZipCodeError);
      }
    }
    console.log(this.raiseZipCodeError);

    // this.searchData.getHardinessZoneData(this.hardinessZone).subscribe(
    //   (result: string) => {
    //     console.log(result);
    //   },
    //   (error: any) => {
    //     console.error(error);
    //   })

    // this.searchData.getHardinessZoneData(this.hardinessZone).subscribe({
    //   next:response => {
    //     console.log(response)

    //   },
    //   error: error =>{
    //     console.log(error)
    //   }
    // })
  }

  //apply function
  saveCheckboxValues() {
    this.query = '';
    console.log('before if', this.query);
    if (this.sunlight.full_shade) {
      this.query += '&sunlight=full_sun';
    }
    if (this.sunlight.part_shade) {
      this.query += '&sunlight=part_sun';
    }
    if (this.sunlight.sun_part_shade) {
      this.query += '&sunlight=sun-part_shade';
    }
    if (this.sunlight.full_sun) {
      this.query += '&sunlight=full_sun';
    }
    if (this.indoor) {
      this.query += '&indoor=1';
    }
    this.getHardinessZone();

    console.log(this.query);
  }

  //toggle each filter section to expand
  showSunlight = false;
  showIndoor = false;
  showHardinessZone = false;
  toggleSunlight() {
    this.showSunlight = !this.showSunlight;
  }

  toggleIndoor() {
    this.showIndoor = !this.showIndoor;
  }

  toggleHardinessZone() {
    this.showHardinessZone = !this.showHardinessZone;
  }

  //reset function
  resetAll() {
    //reset query
    this.query = '';
    this.sunlight.full_shade = false;
    this.sunlight.part_shade = false;
    this.sunlight.sun_part_shade = false;
    this.sunlight.full_sun = false;
    this.indoor = false;
    this.hardinessZone = '';
    this.zipCodeResult = '';
    this.isZipCodeValid = false;
    this.raiseZipCodeError = false;
  }

  closeAlert(id: string) {
    this.alert.closeAlert(id);
  }

  getSearchData() {
    this.query += `&q=${this.plant_name}`;
    if (this.zipCodeResult) {
      this.query += `&hardiness=${this.zipCodeResult}`;
    }
    console.log(this.query);
    this.searchData.getSearchData(this.query).subscribe({
      next: (response) => {
        console.log(response.data);
        for (let plant of response.data) {
          if (plant.default_image === null) {
            // Create a new default_image object with the original_url property
            plant.default_image = {
              original_url:
                'https://www.chileplants.com/images/chiles/medleybasil.jpg',
            };
          } else if (
            plant.default_image.original_url ==
            'https://perenual.com/storage/image/upgrade_access.jpg'
          ) {
            plant.default_image.original_url =
              'https://www.chileplants.com/images/chiles/medleybasil.jpg';
          }
        }
        this.searchResults = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
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
        console.log("error: ", error);
        console.log("error.status", error.status);
        console.log("error.message", error.message);
        if (error.status === 404) {
          this.getDetailsFromAPI(plantId);
        } else {
          console.log(error);
        }
      }
    })
  } 

  getDetailsFromAPI(plantId: number) {
    this.searchData.getPlantDetails(plantId).subscribe({
      next: response => {
        this.detailsModalService.setDetailResults(response);
        this.detailsModalService.toggleModalVisiblity();
      },
      error: error => {
        console.log(error);
      }
    })
  }

  addPlant(plantObject: any) {
    console.log("search.comp.ts");
    console.log(plantObject);
    this.plants.createPlant(plantObject).subscribe({
      next: response => {
        console.log("addPlant response:");
        console.log(response);
        this.createUserPlant(this.userId, plantObject.id);
      },
      error: error => {
        if (error.status === 409) {
          console.log("error: ", error);
          this.createUserPlant(this.userId, plantObject.id);
        } else {
          console.log("error: ", error);
        }
      }
    })
  }

  // let element = document.getElementById('login_error');
  //       if (element) {
  //         element.removeAttribute('hidden') ;
  //         element.classList.add('error-alert');
  //       } else {
  //         console.log('Element not found.');
  //       }

  createUserPlant(userId: any, plantId: any) {
    this.plants.createUserPlant(userId, plantId).subscribe({
      next: response => {
        this.alert.setMessage("Plant saved!");
        this.alert.setTitle("Success!");
        const plant = this.searchResults.find((plant: { id: any; }) => plant.id === plantId);
        if (plant) {
          let element = document.getElementById('add_plant_alert_'+plant.id);
          element?.classList.add('success-alert');
          plant.showAlert = true;
        }
      }, error: error  => {
        // let element = document.getElementById('add_plant_error');
        // if (error.status === 409) {
        //   element.removeAttribute('hidden') ;
        //   element.classList.add('error-alert');
        // } else {
          
        // }
        console.log("createUserPlant error: ", error);
      }
    })
  }

  // getAlertVisiblity() {
  //   return this.alert.alertVisibility();
  // }

  // showAlertMessage(plantId: number) {
  //   this.plantId.showAlert = true;
  // }
}

import { Component } from '@angular/core';
import { SearchDataService } from '../services/search-data.service';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HARDINESS_ZONE_KEY } from '../env';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResults: any = [];
  

  constructor (
    private searchData:SearchDataService,
    private auth:AuthService,
    private router:Router
    
  ) {}



  //banner words
  words: string[] = ['Easy care', 'Help native wildlife', 'Best plants for you'];
  query: string = ''
  zipCodeResult: any = ''
  isZipCodeValid: boolean=false
  raiseZipCodeError: boolean=false
  //filter section
  sunlight = {
    full_shade: false,
    part_shade: false,
    sun_part_shade: false,
    full_sun: false
  };
  indoor = false;
  hardinessZone = '';
  plant_name = '';

  isUserLoggedIn() {
    if (!this.auth.isUserLoggedIn()) {
      this.router.navigate(['/login'])
    }
  }

  //fetch hardiness zone based on zip code
  getHardinessZone(){
    // validate zipcode
    const zipCodePattern = /^\d{5}(-\d{4})?$/;
    this.isZipCodeValid = zipCodePattern.test(this.hardinessZone)
    console.log(this.hardinessZone)
    
    const fetchHardiness = async () => {
      const url = `https://plant-hardiness-zone.p.rapidapi.com/zipcodes/${this.hardinessZone}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': HARDINESS_ZONE_KEY,
          'X-RapidAPI-Host': 'plant-hardiness-zone.p.rapidapi.com'
        }
      };
      try {
        const response = await fetch(url, options)
        const result = await response.json()
        console.log(result)
        this.zipCodeResult = result.hardiness_zone
        console.log(this.zipCodeResult)
      } catch (error) {
        console.log(error)
      }
    }

    if(this.isZipCodeValid){
      fetchHardiness()
    }else{
      //send error to user, enter a valid zip code
      if(this.zipCodeResult !== ""){
        this.raiseZipCodeError = true
        console.log(this.raiseZipCodeError)
      }else{
        console.log(this.raiseZipCodeError)
      }
    }
    console.log(this.raiseZipCodeError)
    
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
  saveCheckboxValues(){

    if(this.sunlight.full_shade){
      this.query += '&sunlight=full_sun'
    }
    if(this.sunlight.part_shade){
      this.query += '&sunlight=part_sun'
    }
    if(this.sunlight.sun_part_shade){
      this.query += '&sunlight=sun-part_shade'
    }
    if(this.sunlight.full_sun){
      this.query += '&sunlight=full_sun'
    }
    if(this.indoor){
      this.query += '&indoor=1'
    }
    this.getHardinessZone()
    
    console.log(this.query)
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
  resetAll(){
    //reset query
    this.query = ''
    this.sunlight.full_shade =false
    this.sunlight.part_shade =false
    this.sunlight.sun_part_shade =false
    this.sunlight.full_sun =false
    this.indoor = false
    this.hardinessZone = ''
    this.zipCodeResult =''
    this.isZipCodeValid = false
    this.raiseZipCodeError = false
  }

  getSearchData() {
    this.query += `&q=${this.plant_name}`
    if(this.zipCodeResult){
      this.query += `&hardiness=${this.zipCodeResult}`
    }
    console.log(this.query)
    this.searchData.getSearchData(this.query).subscribe({
      next: response => {
        console.log(response.data);
        for(let plant of response.data){
          if (plant.default_image === null) {
            // Create a new default_image object with the original_url property
            plant.default_image = { original_url: "https://www.chileplants.com/images/chiles/medleybasil.jpg" };
          }else if(plant.default_image.original_url == "https://perenual.com/storage/image/upgrade_access.jpg"){
            plant.default_image.original_url = "https://www.chileplants.com/images/chiles/medleybasil.jpg"
          }
        }
        this.searchResults = response.data;
      },
      error: error => {
        console.log(error);
      }
    })
  }
}

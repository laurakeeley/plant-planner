import { Component } from '@angular/core';
import { SearchDataService } from '../services/search-data.service';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HARDINESS_ZONE_KEY } from '../env';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResults: any = [];
  auth: AuthService;
  zipCodeResults: any = []

  constructor (
    private searchData:SearchDataService,
    private authService:AuthService
    
  ) {
    this.auth = authService;
  }

  ngOnInit() {
    // this.getSearchData();
  }

  //banner words
  words: string[] = ['Easy care', 'Help native wildlife', 'Best plants for you'];
  query: string = ''
  //filter section
  sunlight = {
    full_shade: false,
    part_shade: false,
    sun_part_shade: false,
    full_sun: false
  };
  indoor = false;
  hardinessZone = '';

  //fetch hardiness zone based on zip code
  getHardinessZone(){
    console.log(this.hardinessZone)
    
    this.searchData.getHardinessZoneData(this.hardinessZone).subscribe(
      (result: string) => {
        console.log(result);
      },
      (error: any) => {
        console.error(error);
      })
  }


  
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

  // getSearchData() {
  //   this.searchData.getSearchData().subscribe({
  //     next: response => {
  //       console.log(response.data);
  //       this.searchResults = response.data;
  //     },
  //     error: error => {
  //       console.log(error);
  //     }
  //   })
  // }
}

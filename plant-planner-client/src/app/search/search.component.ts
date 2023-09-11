import { Component } from '@angular/core';
import { SearchDataService } from '../services/search-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResults = {};

  constructor (private searchData:SearchDataService) {}

  ngOnInit() {
    this.getSearchData();
  }

  //banner words
  words: string[] = ['Easy care', 'Help native wildlife', 'Best plants for you'];

  //filter section
  sunlight = {
    full_shade: false,
    part_shade: false,
    sun_part_shade: false,
    full_sun: false
  };
  indoor = false;
  hardinessZone = '';

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

  getSearchData() {
    // this.searchData.getSearchData().subscribe({
    //   next: response => {
    //     console.log(response);
    //     this.searchResults = response;
    //   },
    //   error: error => {
    //     console.log(error);
    //   }
    // })
  }
}

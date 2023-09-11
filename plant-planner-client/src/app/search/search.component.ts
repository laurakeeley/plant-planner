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

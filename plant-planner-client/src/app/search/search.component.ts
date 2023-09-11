import { Component } from '@angular/core';
import { SearchDataService } from '../services/search-data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResults: any = [];
  auth: AuthService;

  constructor (
    private searchData:SearchDataService,
    private authService:AuthService
  ) {
    this.auth = authService;
  }

  ngOnInit() {
    this.getSearchData();
  }

  getSearchData() {
    this.searchData.getSearchData().subscribe({
      next: response => {
        console.log(response.data);
        this.searchResults = response.data;
      },
      error: error => {
        console.log(error);
      }
    })
  }
}

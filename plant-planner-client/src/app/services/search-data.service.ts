import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchDataService {

  constructor(private http:HttpClient) { }

  getSearchResults() {
    // return this.http.get<any>()
  }
}

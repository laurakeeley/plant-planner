import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PLANT_SEARCH_KEY } from '../env';

@Injectable({
  providedIn: 'root'
})
export class SearchDataService {

  constructor(private http:HttpClient) { }

  getSearchData() {
    return this.http.get<any>(`https://perenual.com/api/species-list?key=${PLANT_SEARCH_KEY}`);
  }
}

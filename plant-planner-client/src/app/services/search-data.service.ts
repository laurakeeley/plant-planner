import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PLANT_SEARCH_KEY } from '../env';
import { HARDINESS_ZONE_KEY } from '../env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchDataService {
  private hardinessZoneApiUrl = 'https://plant-hardiness-zone.p.rapidapi.com/zipcodes/';
  private headers = new HttpHeaders({
    'X-RapidAPI-Key': HARDINESS_ZONE_KEY,
    'X-RapidAPI-Host': 'plant-hardiness-zone.p.rapidapi.com'
  });
  constructor(private http:HttpClient) { }

  getSearchData() {
    return this.http.get<any>(`https://perenual.com/api/species-list?key=${PLANT_SEARCH_KEY}`);
  }
  //define hardiness zone function call
  getHardinessZoneData(zipCode: string): Observable<string>{
    
    console.log(`${this.hardinessZoneApiUrl}${zipCode}`)
    let api = `${this.hardinessZoneApiUrl}${zipCode}`
    // return this.http.get<any>(`https://plant-hardiness-zone.p.rapidapi.com/zipcodes/${zipCode}/?rapidapi-key=${HARDINESS_ZONE_KEY}`)
    
    return this.http.get<string>(api, {headers: this.headers});
  }
}

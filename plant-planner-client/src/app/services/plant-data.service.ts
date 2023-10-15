import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../env';
import { userId } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class PlantDataService {

  constructor(private http: HttpClient) {}

  getUserPlants(userId: any) {
    return this.http.get<any>(`${BASE_URL}/getPlants?user_id=${userId}`);
}

  createPlant(plantObject: any) {
    const plant_id = plantObject.id;
    const plant_name = plantObject.common_name;
    const details = plantObject;
    const data = {plant_id, plant_name, details};
    console.log("plant-data.service.ts");
    console.log(data);
    // const data = {plantObject};
    return this.http.post<any>(`${BASE_URL}/addPlantDetailsIndb`, data);
  }
}

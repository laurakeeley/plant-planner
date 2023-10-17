import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../env';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PlantDataService {

  constructor(private http: HttpClient) {}

  getUser(userId: any) {
    const user_id = parseInt(userId);
    return this.http.get<any>(`${BASE_URL}/getPlants/${user_id}`);
  }
  

  createPlant(plantObject: any) {
    const plant_id = plantObject.id;
    const plant_name = plantObject.common_name;
    const details = plantObject;
    const data = {plant_id, plant_name, details};
    console.log("plant-data.service.ts");
    console.log(data);
    return this.http.post<any>(`${BASE_URL}/addPlantDetailsIndb`, data);
  }

  getPlant(plantId: number) {
    return this.http.get<any>(`${BASE_URL}/searchPlantsDetails?plant_id=${plantId}`)
      .pipe(
        map(response => {
          console.log("getPlant map response: ", response);
          return response;
        }),
        catchError(error => {
          console.log("getPlant catchError error: ", error);
          return error;
        })
      )
  }
}

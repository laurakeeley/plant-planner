import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../env';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PlantDataService {
  userPlants: any = [];

  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<any>(`${BASE_URL}/getPlants`);
  }

  setUserPlants(userPlants: any) {
    this.userPlants = userPlants;
  }

  createPlant(plantObject: any) {
    const plant_id = plantObject.id;
    const plant_name = plantObject.common_name;
    const details = plantObject;
    const data = {plant_id, plant_name, details};
    return this.http.post<any>(`${BASE_URL}/addPlantDetailsIndb`, data);
  }

  getPlant(plantId: number) {
    return this.http.get<any>(`${BASE_URL}/searchPlantsDetails/${plantId}`)
      .pipe(
        map(response => {
          console.log("getPlant map response: ", response);
          return response;
        }),
        catchError(error => {
          console.log("getPlant catchError error: ", error);
          throw error;
        })
      )
  }

  createUserPlant(userId: any, plantId: any) {
    userId = parseInt(userId);
    const data = {user_id: userId, plant_id: plantId};
    return this.http.post<any>(`${BASE_URL}/addPlantToProfile`, data);
  }

  deleteUserPlant(plantId: number) {
    return this.http.delete<any>(`${BASE_URL}/deletePlantsDetails/${plantId}`);
  }

  removePlantFromProfile(plantId: number) {
    const plantIndex = this.userPlants.findIndex((plant: any) => plant.plant_id === plantId);
    this.userPlants.splice(plantIndex, 1);
  }
}

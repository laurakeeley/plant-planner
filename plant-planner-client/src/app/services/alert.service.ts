import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  closeAlert(id: string) {
    let element = document.getElementById(id);
    element
      ? element.setAttribute('hidden', 'true')
      : console.log('Element not found.');
  }
}

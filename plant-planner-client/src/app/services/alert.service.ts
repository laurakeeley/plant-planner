import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alertTitle: string = '';
  alertMessage: string = '';
  alertTitleChanged: EventEmitter<string> = new EventEmitter<string>();
  alertMessageChanged: EventEmitter<string> = new EventEmitter<string>();

  setTitle(title: string) {
    this.alertTitle = title;
    this.alertTitleChanged.emit(title);
  }

  getTitle() {
    return this.alertTitle;
  }

  setMessage(message: string) {
    this.alertMessage = message;
    this.alertMessageChanged.emit(message);
  }

  getMessage() {
    return this.alertMessage;
  }

  closeAlert(id: string) {
    let element = document.getElementById(id);
    element
      ? element.setAttribute('hidden', 'true')
      : console.log('Element not found.');
  }
}

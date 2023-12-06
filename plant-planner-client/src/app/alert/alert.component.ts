import { Component } from '@angular/core';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent { 
  alertMessage: string = '';
  alertTitle: string = '';

  constructor(private alert: AlertService) {}

  ngOnInit() {
    this.alert.alertTitleChanged.subscribe((title) => {
      this.alertTitle = title;
    });
    this.alert.alertMessageChanged.subscribe((message) => {
      this.alertMessage = message;
    });
  }

  closeAlert(id: string) {
    this.alert.closeAlert(id);
  }

}


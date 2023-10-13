import { Component } from '@angular/core';
import { DetailsModalServiceService } from '../services/details-modal-service.service';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})


export class DetailsModalComponent {
  response: any;
 
  constructor (private detailsModalService: DetailsModalServiceService) {
    this.detailsModalService.opened.subscribe(() => { 
      this.loadPlantDetails();
    })
  }
  
  getModalVisiblity() {
    return this.detailsModalService.modalVisibility();
  }
  
  close() {
    this.detailsModalService.modalHidden = true;
  }
  
  loadPlantDetails() {
    this.response = this.detailsModalService.getDetailResults();
    console.log("details-modal.component.ts", this.response);
  }
  
}

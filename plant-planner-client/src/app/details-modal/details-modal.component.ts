import { Component } from '@angular/core';
import { DetailsModalServiceService } from '../services/details-modal-service.service';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})
export class DetailsModalComponent {


  constructor (private detailsModalService: DetailsModalServiceService) {}

  getModalVisiblity() {
    return this.detailsModalService.modalVisibility();
  }

  close() {
    this.detailsModalService.modalVisible = false;
  }

}

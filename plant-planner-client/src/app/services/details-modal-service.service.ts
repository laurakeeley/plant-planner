import { Injectable } from '@angular/core';
import { DetailsModalComponent } from '../details-modal/details-modal.component';

@Injectable({
  providedIn: 'root'
})
export class DetailsModalServiceService {
  modalVisible = true;

  modalVisibility() {
    this.modalVisible = !this.modalVisible;
    return this.modalVisible;
  }
}

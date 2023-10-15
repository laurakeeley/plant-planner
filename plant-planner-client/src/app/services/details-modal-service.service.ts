import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailsModalServiceService {
  private response: any;
  modalHidden: boolean = true;

  @Output() opened: EventEmitter<void> = new EventEmitter<void>();
  @Output() closed: EventEmitter<void> = new EventEmitter<void>();

  modalVisibility() {
    return this.modalHidden;
  }

  toggleModalVisiblity() {
    this.modalHidden = !this.modalHidden;
    if (!this.modalHidden) {
      this.opened.emit();
    } else {
      this.closed.emit();
    }
  }

  setDetailResults(results: any) {
    this.response = results;
  }

  getDetailResults() {
    return this.response;
  }
  
}

import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailsModalServiceService {
  private response: any;
  modalHidden: boolean = true;
  isLoading: boolean = false;

  @Output() opened: EventEmitter<void> = new EventEmitter<void>();
  @Output() closed: EventEmitter<void> = new EventEmitter<void>();

  modalVisibility() {
    return this.modalHidden;
  }

  loaderVisibility() {
    return this.isLoading;
  }

  toggleLoaderVisiblity() {
    this.isLoading = !this.isLoading;
  }

  toggleModalVisiblity() {
    this.modalHidden = !this.modalHidden;
    if (!this.modalHidden) {
      this.opened.emit();
      this.toggleLoaderVisiblity();
    } else {
      this.closed.emit();
    }
  }

  setDetailResults(results: any) {
    this.replaceNullImage(results);
    this.response = results;
  }

  getDetailResults() {
    return this.response;
  }

  replaceNullImage(response: any) {
    if (response.default_image === null) {
      // Create a new default_image object with the original_url property
      response.default_image = {
        original_url:
          'https://www.chileplants.com/images/chiles/medleybasil.jpg',
      };
    } else if (
      response.default_image.original_url ==
      'https://perenual.com/storage/image/upgrade_access.jpg'
    ) {
      response.default_image.original_url =
        'https://www.chileplants.com/images/chiles/medleybasil.jpg';
    }
  }
  
}

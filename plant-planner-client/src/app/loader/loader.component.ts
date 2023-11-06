import { Component } from '@angular/core';
import { DetailsModalServiceService } from '../services/details-modal-service.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {

  constructor (private detailsModalService: DetailsModalServiceService) {}

  isLoading() {
    return this.detailsModalService.loaderVisibility();
  }
}

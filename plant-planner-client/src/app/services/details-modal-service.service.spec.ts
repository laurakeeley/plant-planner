import { TestBed } from '@angular/core/testing';

import { DetailsModalServiceService } from './details-modal-service.service';

describe('DetailsModalServiceService', () => {
  let service: DetailsModalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsModalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

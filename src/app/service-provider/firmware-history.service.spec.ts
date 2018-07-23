import { TestBed, inject } from '@angular/core/testing';

import { FirmwareHistoryService } from './firmware-history.service';

describe('FirmwareHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirmwareHistoryService]
    });
  });

  it('should be created', inject([FirmwareHistoryService], (service: FirmwareHistoryService) => {
    expect(service).toBeTruthy();
  }));
});

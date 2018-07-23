import { TestBed, inject } from '@angular/core/testing';

import { SpAuthService } from './sp-auth.service';

describe('SpAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpAuthService]
    });
  });

  it('should be created', inject([SpAuthService], (service: SpAuthService) => {
    expect(service).toBeTruthy();
  }));
});

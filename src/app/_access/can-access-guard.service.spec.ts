import { TestBed, inject } from '@angular/core/testing';

import { CanAccessGuardService } from './can-access-guard.service';

describe('CanAccessGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanAccessGuardService]
    });
  });

  it('should be created', inject([CanAccessGuardService], (service: CanAccessGuardService) => {
    expect(service).toBeTruthy();
  }));
});

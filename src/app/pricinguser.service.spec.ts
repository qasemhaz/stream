import { TestBed } from '@angular/core/testing';

import { PricinguserService } from './pricinguser.service';

describe('PricinguserService', () => {
  let service: PricinguserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PricinguserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

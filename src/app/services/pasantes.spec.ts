import { TestBed } from '@angular/core/testing';

import { PasantesServices } from './pasantes';

describe('Pasantes', () => {
  let service: PasantesServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasantesServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

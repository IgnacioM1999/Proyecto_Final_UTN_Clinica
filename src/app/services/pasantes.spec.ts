import { TestBed } from '@angular/core/testing';

import { Pasantes } from './pasantes';

describe('Pasantes', () => {
  let service: Pasantes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pasantes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

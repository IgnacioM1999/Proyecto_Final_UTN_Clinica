import { TestBed } from '@angular/core/testing';

import { TratamientosServices } from './tratamientos';

describe('Tratamientos', () => {
  let service: TratamientosServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TratamientosServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

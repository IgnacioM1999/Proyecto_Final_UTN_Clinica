import { TestBed } from '@angular/core/testing';

import { Sintomas } from './sintomas';

describe('Sintomas', () => {
  let service: Sintomas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sintomas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { Antecedentes } from './antecedentes';

describe('Antecedentes', () => {
  let service: Antecedentes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Antecedentes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

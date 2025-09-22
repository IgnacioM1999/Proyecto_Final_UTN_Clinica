import { TestBed } from '@angular/core/testing';

import { TurnosServices } from './turnos';

describe('Turnos', () => {
  let service: TurnosServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnosServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

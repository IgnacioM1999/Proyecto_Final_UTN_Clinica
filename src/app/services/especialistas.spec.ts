import { TestBed } from '@angular/core/testing';

import { Especialistas } from './especialistas';

describe('Especialistas', () => {
  let service: Especialistas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Especialistas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

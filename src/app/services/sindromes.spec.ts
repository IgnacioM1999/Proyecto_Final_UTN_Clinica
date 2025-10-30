import { TestBed } from '@angular/core/testing';

import { Sindromes } from './sindromes';

describe('Sindromes', () => {
  let service: Sindromes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sindromes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

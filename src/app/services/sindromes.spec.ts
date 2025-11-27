import { TestBed } from '@angular/core/testing';

import { SindromesServices } from './sindromes';

describe('Sindromes', () => {
  let service: SindromesServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SindromesServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

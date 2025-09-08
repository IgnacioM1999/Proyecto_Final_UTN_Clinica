import { TestBed } from '@angular/core/testing';

import { InsumosServices } from './insumos';

describe('Insumos', () => {
  let service: InsumosServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsumosServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

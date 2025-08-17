import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearInsumo } from './crear-insumo';

describe('CrearInsumo', () => {
  let component: CrearInsumo;
  let fixture: ComponentFixture<CrearInsumo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearInsumo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearInsumo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesSesion } from './detalles-sesion';

describe('DetallesSesion', () => {
  let component: DetallesSesion;
  let fixture: ComponentFixture<DetallesSesion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesSesion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesSesion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

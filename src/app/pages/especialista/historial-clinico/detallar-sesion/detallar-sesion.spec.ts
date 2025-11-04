import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallarSesion } from './detallar-sesion';

describe('DetallarSesion', () => {
  let component: DetallarSesion;
  let fixture: ComponentFixture<DetallarSesion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallarSesion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallarSesion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

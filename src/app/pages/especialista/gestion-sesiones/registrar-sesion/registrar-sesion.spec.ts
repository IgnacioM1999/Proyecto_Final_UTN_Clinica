import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarSesion } from './registrar-sesion';

describe('RegistrarSesion', () => {
  let component: RegistrarSesion;
  let fixture: ComponentFixture<RegistrarSesion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarSesion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarSesion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

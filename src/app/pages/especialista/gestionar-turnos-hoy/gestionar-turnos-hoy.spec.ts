import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarTurnosHoy } from './gestionar-turnos-hoy';

describe('GestionarTurnosHoy', () => {
  let component: GestionarTurnosHoy;
  let fixture: ComponentFixture<GestionarTurnosHoy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarTurnosHoy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarTurnosHoy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

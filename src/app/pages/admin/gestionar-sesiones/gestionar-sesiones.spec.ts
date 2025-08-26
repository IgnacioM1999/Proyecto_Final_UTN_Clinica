import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarSesiones } from './gestionar-sesiones';

describe('GestionarSesiones', () => {
  let component: GestionarSesiones;
  let fixture: ComponentFixture<GestionarSesiones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarSesiones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarSesiones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSesiones } from './gestion-sesiones';

describe('GestionSesiones', () => {
  let component: GestionSesiones;
  let fixture: ComponentFixture<GestionSesiones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionSesiones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionSesiones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

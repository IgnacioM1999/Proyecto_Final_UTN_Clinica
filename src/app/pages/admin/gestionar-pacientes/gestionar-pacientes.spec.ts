import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarPacientes } from './gestionar-pacientes';

describe('GestionarPacientes', () => {
  let component: GestionarPacientes;
  let fixture: ComponentFixture<GestionarPacientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarPacientes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarPacientes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

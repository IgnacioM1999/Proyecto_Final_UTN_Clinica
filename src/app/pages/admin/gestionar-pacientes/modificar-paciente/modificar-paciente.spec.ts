import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPaciente } from './modificar-paciente';

describe('ModificarPaciente', () => {
  let component: ModificarPaciente;
  let fixture: ComponentFixture<ModificarPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarPaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarPaciente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

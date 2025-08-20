import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPaciente } from './eliminar-paciente';

describe('EliminarPaciente', () => {
  let component: EliminarPaciente;
  let fixture: ComponentFixture<EliminarPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarPaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarPaciente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoSesionesPaciente } from './listado-sesiones-paciente';

describe('ListadoSesionesPaciente', () => {
  let component: ListadoSesionesPaciente;
  let fixture: ComponentFixture<ListadoSesionesPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoSesionesPaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoSesionesPaciente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

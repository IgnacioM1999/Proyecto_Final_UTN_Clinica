import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPaciente } from './listar-paciente';

describe('ListarPaciente', () => {
  let component: ListarPaciente;
  let fixture: ComponentFixture<ListarPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarPaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPaciente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

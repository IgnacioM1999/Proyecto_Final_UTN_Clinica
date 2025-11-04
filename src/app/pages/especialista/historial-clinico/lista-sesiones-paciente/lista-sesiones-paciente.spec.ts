import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSesionesPaciente } from './lista-sesiones-paciente';

describe('ListaSesionesPaciente', () => {
  let component: ListaSesionesPaciente;
  let fixture: ComponentFixture<ListaSesionesPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaSesionesPaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSesionesPaciente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

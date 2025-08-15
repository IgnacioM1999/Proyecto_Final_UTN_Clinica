import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTurno } from './listar-turno';

describe('ListarTurno', () => {
  let component: ListarTurno;
  let fixture: ComponentFixture<ListarTurno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarTurno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTurno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

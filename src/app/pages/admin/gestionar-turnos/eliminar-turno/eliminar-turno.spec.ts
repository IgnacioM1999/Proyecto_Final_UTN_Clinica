import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarTurno } from './eliminar-turno';

describe('EliminarTurno', () => {
  let component: EliminarTurno;
  let fixture: ComponentFixture<EliminarTurno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarTurno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarTurno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTurno } from './crear-turno';

describe('CrearTurno', () => {
  let component: CrearTurno;
  let fixture: ComponentFixture<CrearTurno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTurno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTurno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarTurno } from './agendar-turno';

describe('AgendarTurno', () => {
  let component: AgendarTurno;
  let fixture: ComponentFixture<AgendarTurno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendarTurno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendarTurno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

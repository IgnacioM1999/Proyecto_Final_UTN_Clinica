import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTurno } from './modificar-turno';

describe('ModificarTurno', () => {
  let component: ModificarTurno;
  let fixture: ComponentFixture<ModificarTurno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarTurno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarTurno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

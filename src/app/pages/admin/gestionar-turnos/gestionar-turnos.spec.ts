import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarTurnos } from './gestionar-turnos';

describe('GestionarTurnos', () => {
  let component: GestionarTurnos;
  let fixture: ComponentFixture<GestionarTurnos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarTurnos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarTurnos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

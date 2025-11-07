import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTurnos } from './ver-turnos';

describe('VerTurnos', () => {
  let component: VerTurnos;
  let fixture: ComponentFixture<VerTurnos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerTurnos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerTurnos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

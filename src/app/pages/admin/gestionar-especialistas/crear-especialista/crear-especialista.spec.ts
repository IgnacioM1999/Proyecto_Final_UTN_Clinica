import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEspecialista } from './crear-especialista';

describe('CrearEspecialista', () => {
  let component: CrearEspecialista;
  let fixture: ComponentFixture<CrearEspecialista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEspecialista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEspecialista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

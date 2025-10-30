import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarTratamientos } from './mostrar-tratamientos';

describe('MostrarTratamientos', () => {
  let component: MostrarTratamientos;
  let fixture: ComponentFixture<MostrarTratamientos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarTratamientos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarTratamientos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

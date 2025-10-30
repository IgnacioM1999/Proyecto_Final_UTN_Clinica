import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPuntos } from './registrar-puntos';

describe('RegistrarPuntos', () => {
  let component: RegistrarPuntos;
  let fixture: ComponentFixture<RegistrarPuntos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarPuntos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarPuntos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

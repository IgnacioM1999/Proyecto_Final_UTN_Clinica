import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPasanteEsp } from './registrar-pasante';

describe('RegistrarPasante', () => {
  let component: RegistrarPasanteEsp;
  let fixture: ComponentFixture<RegistrarPasanteEsp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarPasanteEsp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarPasanteEsp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

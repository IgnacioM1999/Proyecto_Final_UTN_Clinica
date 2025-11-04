import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarPasantesEsp } from './gestionar-pasantes';

describe('GestionarPasantes', () => {
  let component: GestionarPasantesEsp;
  let fixture: ComponentFixture<GestionarPasantesEsp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarPasantesEsp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarPasantesEsp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

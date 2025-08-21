import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarEspecialistas } from './gestionar-especialistas';

describe('GestionarEspecialistas', () => {
  let component: GestionarEspecialistas;
  let fixture: ComponentFixture<GestionarEspecialistas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarEspecialistas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarEspecialistas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

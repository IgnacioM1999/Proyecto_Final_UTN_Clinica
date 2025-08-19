import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPasante } from './crear-pasante';

describe('CrearPasante', () => {
  let component: CrearPasante;
  let fixture: ComponentFixture<CrearPasante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPasante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPasante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

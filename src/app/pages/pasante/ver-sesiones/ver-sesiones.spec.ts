import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSesiones } from './ver-sesiones';

describe('VerSesiones', () => {
  let component: VerSesiones;
  let fixture: ComponentFixture<VerSesiones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerSesiones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerSesiones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

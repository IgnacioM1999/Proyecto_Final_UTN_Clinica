import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pasante } from './pasante';

describe('Pasante', () => {
  let component: Pasante;
  let fixture: ComponentFixture<Pasante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pasante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pasante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

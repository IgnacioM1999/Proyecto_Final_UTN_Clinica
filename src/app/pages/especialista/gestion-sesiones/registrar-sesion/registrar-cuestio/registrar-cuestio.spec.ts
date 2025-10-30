import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCuestio } from './registrar-cuestio';

describe('RegistrarCuestio', () => {
  let component: RegistrarCuestio;
  let fixture: ComponentFixture<RegistrarCuestio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarCuestio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarCuestio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEstado } from './ver-estado';

describe('VerEstado', () => {
  let component: VerEstado;
  let fixture: ComponentFixture<VerEstado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerEstado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerEstado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

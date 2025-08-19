import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarPasantes } from './gestionar-pasantes';

describe('GestionarPasantes', () => {
  let component: GestionarPasantes;
  let fixture: ComponentFixture<GestionarPasantes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarPasantes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarPasantes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

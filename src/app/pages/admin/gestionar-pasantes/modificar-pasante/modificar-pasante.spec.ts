import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPasante } from './modificar-pasante';

describe('ModificarPasante', () => {
  let component: ModificarPasante;
  let fixture: ComponentFixture<ModificarPasante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarPasante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarPasante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

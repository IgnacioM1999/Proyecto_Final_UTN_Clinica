import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarEspecialista } from './modificar-especialista';

describe('ModificarEspecialista', () => {
  let component: ModificarEspecialista;
  let fixture: ComponentFixture<ModificarEspecialista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarEspecialista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarEspecialista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

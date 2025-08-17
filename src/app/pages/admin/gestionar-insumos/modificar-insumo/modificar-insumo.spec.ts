import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarInsumo } from './modificar-insumo';

describe('ModificarInsumo', () => {
  let component: ModificarInsumo;
  let fixture: ComponentFixture<ModificarInsumo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarInsumo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarInsumo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

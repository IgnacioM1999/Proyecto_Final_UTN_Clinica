import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInsumo } from './listar-insumo';

describe('ListarInsumo', () => {
  let component: ListarInsumo;
  let fixture: ComponentFixture<ListarInsumo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarInsumo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarInsumo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

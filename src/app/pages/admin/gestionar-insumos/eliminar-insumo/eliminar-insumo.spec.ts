import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarInsumo } from './eliminar-insumo';

describe('EliminarInsumo', () => {
  let component: EliminarInsumo;
  let fixture: ComponentFixture<EliminarInsumo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarInsumo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarInsumo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

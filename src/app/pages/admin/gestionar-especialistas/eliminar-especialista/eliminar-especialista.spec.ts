import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarEspecialista } from './eliminar-especialista';

describe('EliminarEspecialista', () => {
  let component: EliminarEspecialista;
  let fixture: ComponentFixture<EliminarEspecialista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarEspecialista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarEspecialista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

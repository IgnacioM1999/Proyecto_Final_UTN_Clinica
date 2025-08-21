import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEspecialista } from './listar-especialista';

describe('ListarEspecialista', () => {
  let component: ListarEspecialista;
  let fixture: ComponentFixture<ListarEspecialista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEspecialista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEspecialista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

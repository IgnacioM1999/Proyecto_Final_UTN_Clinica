import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSesion } from './listar-sesion';

describe('ListarSesion', () => {
  let component: ListarSesion;
  let fixture: ComponentFixture<ListarSesion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarSesion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarSesion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSesiones } from './listar-sesiones';

describe('ListarSesiones', () => {
  let component: ListarSesiones;
  let fixture: ComponentFixture<ListarSesiones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarSesiones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarSesiones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

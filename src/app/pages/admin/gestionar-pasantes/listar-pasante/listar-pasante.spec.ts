import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPasante } from './listar-pasante';

describe('ListarPasante', () => {
  let component: ListarPasante;
  let fixture: ComponentFixture<ListarPasante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarPasante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPasante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

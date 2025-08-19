import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPasante } from './eliminar-pasante';

describe('EliminarPasante', () => {
  let component: EliminarPasante;
  let fixture: ComponentFixture<EliminarPasante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarPasante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarPasante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

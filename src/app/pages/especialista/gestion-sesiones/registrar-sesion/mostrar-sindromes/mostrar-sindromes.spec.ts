import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarSindromes } from './mostrar-sindromes';

describe('MostrarSindromes', () => {
  let component: MostrarSindromes;
  let fixture: ComponentFixture<MostrarSindromes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarSindromes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarSindromes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTurnoComponent } from './tabla-turno.component';

describe('TablaTurnoComponent', () => {
  let component: TablaTurnoComponent;
  let fixture: ComponentFixture<TablaTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

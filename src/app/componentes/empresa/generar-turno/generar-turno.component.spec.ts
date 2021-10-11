import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarTurnoComponent } from './generar-turno.component';

describe('GenerarTurnoComponent', () => {
  let component: GenerarTurnoComponent;
  let fixture: ComponentFixture<GenerarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

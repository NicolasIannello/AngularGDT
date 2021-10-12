import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RempresaComponent } from './rempresa.component';

describe('RempresaComponent', () => {
  let component: RempresaComponent;
  let fixture: ComponentFixture<RempresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RempresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

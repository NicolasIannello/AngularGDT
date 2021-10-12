import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RclienteComponent } from './rcliente.component';

describe('RclienteComponent', () => {
  let component: RclienteComponent;
  let fixture: ComponentFixture<RclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RclienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

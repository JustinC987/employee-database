import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollViewModalComponent } from './payroll-view-modal.component';

describe('PayrollViewModalComponent', () => {
  let component: PayrollViewModalComponent;
  let fixture: ComponentFixture<PayrollViewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollViewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

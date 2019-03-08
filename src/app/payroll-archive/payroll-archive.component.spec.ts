import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollArchiveComponent } from './payroll-archive.component';

describe('PayrollArchiveComponent', () => {
  let component: PayrollArchiveComponent;
  let fixture: ComponentFixture<PayrollArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

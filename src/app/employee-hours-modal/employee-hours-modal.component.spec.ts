import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeHoursModalComponent } from './employee-hours-modal.component';

describe('EmployeeHoursModalComponent', () => {
  let component: EmployeeHoursModalComponent;
  let fixture: ComponentFixture<EmployeeHoursModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeHoursModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeHoursModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

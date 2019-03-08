import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHoursModalComponent } from './edit-hours-modal.component';

describe('EditHoursModalComponent', () => {
  let component: EditHoursModalComponent;
  let fixture: ComponentFixture<EditHoursModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHoursModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHoursModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

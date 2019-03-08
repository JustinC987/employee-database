import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteHoursModalComponent } from './delete-hours-modal.component';

describe('DeleteHoursModalComponent', () => {
  let component: DeleteHoursModalComponent;
  let fixture: ComponentFixture<DeleteHoursModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteHoursModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteHoursModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

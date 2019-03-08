import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactArchiveComponent } from './contact-archive.component';

describe('ContactArchiveComponent', () => {
  let component: ContactArchiveComponent;
  let fixture: ComponentFixture<ContactArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

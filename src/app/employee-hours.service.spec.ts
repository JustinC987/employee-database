import { TestBed } from '@angular/core/testing';

import { EmployeeHoursService } from './employee-hours.service';

describe('EmployeeHoursService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeHoursService = TestBed.get(EmployeeHoursService);
    expect(service).toBeTruthy();
  });
});

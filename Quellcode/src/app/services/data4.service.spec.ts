import { TestBed } from '@angular/core/testing';

import { Data4Service } from './data4.service';

describe('Data4Service', () => {
  let service: Data4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Data4Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

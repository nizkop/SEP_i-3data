import { TestBed } from '@angular/core/testing';

import { Data3Service } from './data3.service';

describe('Data3Service', () => {
  let service: Data3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Data3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

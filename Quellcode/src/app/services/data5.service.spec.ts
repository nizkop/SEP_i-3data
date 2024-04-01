import { TestBed } from '@angular/core/testing';

import { Data5Service } from './data5.service';

describe('Data5Service', () => {
  let service: Data5Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Data5Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

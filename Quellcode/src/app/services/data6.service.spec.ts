import { TestBed } from '@angular/core/testing';

import { Data6Service } from './data6.service';

describe('Data6Service', () => {
  let service: Data6Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Data6Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

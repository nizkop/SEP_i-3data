import { TestBed } from '@angular/core/testing';

import { Data8Service } from './data8.service';

describe('Data8Service', () => {
  let service: Data8Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Data8Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

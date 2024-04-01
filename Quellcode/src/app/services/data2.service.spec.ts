import { TestBed } from '@angular/core/testing';

import { Data2Service } from './data2.service';

describe('Data2Service', () => {
  let service: Data2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Data2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

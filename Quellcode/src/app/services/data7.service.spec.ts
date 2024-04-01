import { TestBed } from '@angular/core/testing';

import { Data7Service } from './data7.service';

describe('Data7Service', () => {
  let service: Data7Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Data7Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

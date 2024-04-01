import { TestBed } from '@angular/core/testing';

import { Data2Service } from './data2.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('Data2Service', () => {
  let service: Data2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Data2Service]
    });
    service = TestBed.inject(Data2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

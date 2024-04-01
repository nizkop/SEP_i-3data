import { TestBed } from '@angular/core/testing';

import { Data4Service } from './data4.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Data2Service} from "./data2.service";

describe('Data4Service', () => {
  let service: Data4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Data4Service]
    });
    service = TestBed.inject(Data4Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { Data5Service } from './data5.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Data2Service} from "./data2.service";

describe('Data5Service', () => {
  let service: Data5Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Data5Service]
    });
    service = TestBed.inject(Data5Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

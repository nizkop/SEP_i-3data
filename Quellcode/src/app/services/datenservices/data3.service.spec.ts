import { TestBed } from '@angular/core/testing';

import { Data3Service } from './data3.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Data2Service} from "./data2.service";

describe('Data3Service', () => {
  let service: Data3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Data3Service]
    });
    service = TestBed.inject(Data3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

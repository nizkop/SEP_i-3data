import { TestBed } from '@angular/core/testing';

import { Data8Service } from './data8.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Data2Service} from "./data2.service";

describe('Data8Service', () => {
  let service: Data8Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Data8Service]
    });
    service = TestBed.inject(Data8Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

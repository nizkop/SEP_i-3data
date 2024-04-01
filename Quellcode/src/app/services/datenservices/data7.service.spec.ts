import { TestBed } from '@angular/core/testing';

import { Data7Service } from './data7.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Data2Service} from "./data2.service";

describe('Data7Service', () => {
  let service: Data7Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Data7Service]
    });
    service = TestBed.inject(Data7Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { Data6Service } from './data6.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";


describe('Data6Service', () => {
  let service: Data6Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Data6Service]
    });
    service = TestBed.inject(Data6Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

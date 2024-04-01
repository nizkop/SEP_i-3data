import { TestBed } from '@angular/core/testing';

import { DatenbegrenzungTabService } from './datenbegrenzung-tab.service';

describe('DatenbegrenzungTabService', () => {
  let service: DatenbegrenzungTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatenbegrenzungTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

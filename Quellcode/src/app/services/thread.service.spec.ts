import { TestBed } from '@angular/core/testing';

import { ThreadService } from './thread.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";

describe('ThreadService', () => {
  let service: ThreadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(ThreadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

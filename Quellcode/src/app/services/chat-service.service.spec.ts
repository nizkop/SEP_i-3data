import { TestBed } from '@angular/core/testing';

import { ChatService } from './chat-service.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ChatServiceService', () => {
  let service: ChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

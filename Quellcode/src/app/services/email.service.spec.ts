import { TestBed } from '@angular/core/testing';
import { EmailService } from './email.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmailService]
    });
    service = TestBed.inject(EmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

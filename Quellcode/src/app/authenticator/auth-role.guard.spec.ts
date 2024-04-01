import { TestBed } from '@angular/core/testing';
import { AuthRoleGuard } from './auth-role.guard';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AuthRoleGuard', () => {
  let guard: AuthRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthRoleGuard]
    });
    guard = TestBed.inject(AuthRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

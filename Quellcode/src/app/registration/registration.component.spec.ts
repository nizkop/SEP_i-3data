import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration.component';
import { AuthService } from '../authenticator/auth.service';
import { EmailService } from '../services/EmailService';
import { UserService } from '../services/user.service';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, MatCardModule, MatInputModule, NoopAnimationsModule],
      providers: [AuthService, EmailService, UserService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('checkName', () => {
    it('should return an error message when firstName and lastName are empty', () => {
      // Eingaben setzen für den Test:
      component.firstName = '';
      component.lastName = '';

      const result = component.checkName(); // getestete Funktion
      // Überprüfung:
      expect(result).toContain('Bitte geben Sie Ihren Namen ein.');
    });
  });

  describe('checkEmail', () => {
    const testCases = [
      {
        input: {
          email: 'test@example.com',
          emailCopy: 'test@example.com'
        },
        expectedOutput: ''
      },
      {
        input: {
          email: 'testexample.com',
          emailCopy: ''
        },
        expectedOutput: 'Bitte wiederholen Sie Ihre E-Mail-Adresse.\n'
      },
      {
        input: {
          email: 'test1@example.com',
          emailCopy: 'test2@example.com'
        },
        expectedOutput: 'Ihre E-Mail-Eingaben nicht identisch.\n'
      },
      {
        input: {
          email: 'testexample.com',
          emailCopy: 'testexample.com'
        },
        expectedOutput: 'Die angegebene E-Mail-Adresse ist ungültig.\n'
      },
      {
        input: {
          email: 'test@examplecom',
          emailCopy: 'test@examplecom'
        },
        expectedOutput: 'Die angegebene E-Mail-Adresse ist ungültig.\n'
      }
    ];

    testCases.forEach((testCase, index) => {
      const testName = `should return correct error message for email - Test Case ${index + 1}`;

      it(testName, () => {
        // Eingaben setzen für den Test
        component.email = testCase.input.email;
        component.setEmailCopy({ value: testCase.input.emailCopy } as HTMLInputElement);

        const result = component.checkEmail(); // getestete Funktion
        expect(result).toBe(testCase.expectedOutput); // Überprüfung
      });
    });
  });
});

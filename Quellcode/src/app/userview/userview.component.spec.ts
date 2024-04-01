import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserviewComponent } from './userview.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UserService} from "../services/user.service";
import {of} from "rxjs";
import {FormsModule} from "@angular/forms";
import {testuser, testuser2} from "../Model/test/test-user";

describe('UserviewComponent', () => {
  let component: UserviewComponent;
  let fixture: ComponentFixture<UserviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserviewComponent ],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        FormsModule,
        MatFormFieldModule,
        MatTableModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
        providers: [
        // Mocken des UserService
        {
          provide: UserService,
          useValue: {
            getCurrentUser: () => of(testuser),
            getAllUsers: () => of([testuser, testuser2])
          },
        },
      ],
    }).compileComponents();


    fixture = TestBed.createComponent(UserviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

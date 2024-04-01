import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditprofileComponent } from './editprofile.component';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import {FormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {testuser} from "../../Model/test/test-user";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDialogModule} from "@angular/material/dialog";

describe('EditprofileComponent', () => {
  let component: EditprofileComponent;
  let fixture: ComponentFixture<EditprofileComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditprofileComponent],
      imports: [HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        MatTableModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        MatDialogModule
        ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                user: testuser
              }
            }
          }
        },
        {
          provide: UserService,
          useValue: {
            getCurrentUser: () => of(testuser) // Mock getCurrentUser method
          }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditprofileComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService); // Inject the UserService
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

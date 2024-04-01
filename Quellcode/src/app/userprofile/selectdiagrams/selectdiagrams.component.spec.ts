import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectdiagramsComponent } from './selectdiagrams.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {UserService} from "../../services/user.service";
import {of} from "rxjs";
import {testuser, testuser2} from "../../Model/test/test-user";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";

describe('SelectdiagramsComponent', () => {
  let component: SelectdiagramsComponent;
  let fixture: ComponentFixture<SelectdiagramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectdiagramsComponent ],
      imports: [HttpClientTestingModule,
            FormsModule,
            ReactiveFormsModule,
            MatDialogModule,
            MatCheckboxModule,
            MatSlideToggleModule,
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
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectdiagramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

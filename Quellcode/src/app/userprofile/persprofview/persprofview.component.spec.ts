import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersprofviewComponent } from './persprofview.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {UserService} from "../../services/user.service";
import {of} from "rxjs";
import {testuser, testuser2} from "../../Model/test/test-user";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('PersprofviewComponent', () => {
  let component: PersprofviewComponent;
  let fixture: ComponentFixture<PersprofviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersprofviewComponent ],
      imports: [HttpClientTestingModule,
                MatDialogModule
      ],
      providers: [
        // Mocken des UserService
        {
          provide: UserService,
          useValue: {
            getCurrentUser: () => of(testuser),
            getAllUsers: () => of([testuser, testuser2]),
            getUserById: () => of(testuser)
          },
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {userID: 1},
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersprofviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

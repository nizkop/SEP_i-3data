import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThreadComponent } from './thread.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatCardModule} from "@angular/material/card";
import {ActivatedRoute} from "@angular/router";
import {testuser} from "../../Model/test/test-user";
import {UserService} from "../../services/user.service";
import {of} from "rxjs";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldControl, MatFormFieldModule} from "@angular/material/form-field";
import {ThreadService} from "../../services/thread.service";
import {Thread} from "../../Model/thread";
import {testthread} from "../../Model/test/testthread";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('ThreadComponent', () => {
  let component: ThreadComponent;
  let fixture: ComponentFixture<ThreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadComponent ],
      imports: [
            HttpClientTestingModule,
            MatCardModule,
            MatButtonToggleModule,
            MatIconModule,
            MatFormFieldModule,
            MatInputModule,
            BrowserAnimationsModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                user: testuser,
              },
              params: {
                id: 123 // Mocked ID value
              }
            }
          }
        },
        {provide: ThreadService,
          useValue: {
             getThread: () => of(testthread) // Mocken des Threat-Services, um an die ID zu gelangen
            ,
            snapshot: {
              data: {
                id: testthread.id
              }
            }
          }
        },
        {
          provide: UserService,
          useValue: {
            getCurrentUser: () => of(testuser) // Mock getCurrentUser method
          }
        },
        // {
        //   provide: MatDialogRef,
        //   useValue: {},
        // },
        // {
        //   provide: MAT_DIALOG_DATA,
        //   useValue: {userID: 1},
        // },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

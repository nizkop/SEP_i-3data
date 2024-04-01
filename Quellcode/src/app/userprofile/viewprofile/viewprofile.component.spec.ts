import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewprofileComponent } from './viewprofile.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {of} from "rxjs";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatTableModule} from "@angular/material/table";
import {testuser} from "../../Model/test/test-user";
import {MatDialogModule} from "@angular/material/dialog";


describe('ViewprofileComponent', () => {
  let component: ViewprofileComponent;
  let fixture: ComponentFixture<ViewprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewprofileComponent ],
      imports: [HttpClientTestingModule,
        MatCardModule,
        MatListModule,
        MatTableModule, MatDialogModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                user: testuser
              } ,
              params: {
                    id: '0'
                  }
            }
          }
        },
        {
          provide: UserService,
          useValue: {
            getCurrentUser: () => of(testuser), // Mock getCurrentUser method
            getUserById: () => of(testuser),
            getFriends: () => of([]),
            viewImage: () => of("")
          }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

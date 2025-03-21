import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserlistComponent } from './userlist.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatCardModule} from "@angular/material/card";
import {UserService} from "../../services/user.service";
import {of} from "rxjs";
import {MatTableModule} from "@angular/material/table";
import {testuser} from "../../Model/test/test-user";

describe('UserlistComponent', () => {
  let component: UserlistComponent;
  let fixture: ComponentFixture<UserlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserlistComponent ],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatTableModule,
        ],
      providers: [
        // Mocken des UserService
        {
          provide: UserService,
          useValue: {
            getCurrentUser: () => of(testuser),
            getAllUsers: () => of([testuser])
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

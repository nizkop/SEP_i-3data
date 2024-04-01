import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InboxComponent } from './inbox.component';
import {UserService} from "../services/user.service";
import {of} from "rxjs";
import {testuser} from "../Model/test/test-user";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";

describe('InboxComponent', () => {
  let component: InboxComponent;
  let fixture: ComponentFixture<InboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InboxComponent ],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatTableModule
      ],
      providers: [
        // Mocken des UserService
        {
          provide: UserService,
          useValue: {
            getCurrentUser: () => of(testuser),
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(InboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

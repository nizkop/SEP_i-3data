import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminTicketviewComponent } from './admin-ticketview.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {UserService} from "../../services/user.service";
import {of} from "rxjs";
import {testuser} from "../../Model/test/test-user";

describe('AdminTicketviewComponent', () => {
  let component: AdminTicketviewComponent;
  let fixture: ComponentFixture<AdminTicketviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTicketviewComponent ],
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
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTicketviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketviewComponent } from './ticketview.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatCardModule} from "@angular/material/card";
import {UserService} from "../../services/user.service";
import {of} from "rxjs";
import {MatTableModule} from "@angular/material/table";
import {testuser} from "../../Model/test/test-user";

describe('TicketviewComponent', () => {
  let component: TicketviewComponent;
  let fixture: ComponentFixture<TicketviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketviewComponent ],
      imports: [HttpClientTestingModule,
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

    fixture = TestBed.createComponent(TicketviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatComponent } from './chat.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatCardModule} from "@angular/material/card";
import {HeaderboxComponent} from "../chat-headerbox/headerbox.component";
import {MatDialogModule} from "@angular/material/dialog";
import {ChatListComponent} from "../chat-list/chat-list.component";
import {ChatBoxComponent} from "../chat-box/chat-box.component";
import {MatIconModule} from "@angular/material/icon";
import {UserService} from "../../services/user.service";
import {of} from "rxjs";
import {testuser} from "../../Model/test/test-user";
import {FormsModule} from "@angular/forms";


describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatComponent , HeaderboxComponent, ChatListComponent, ChatBoxComponent],
      imports: [HttpClientTestingModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        FormsModule
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

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

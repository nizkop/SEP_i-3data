import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatBotComponent } from './chat-bot.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { FormsModule } from '@angular/forms';

describe('ChatBotComponent', () => {
  let component: ChatBotComponent;
  let fixture: ComponentFixture<ChatBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatBotComponent ],
      imports: [HttpClientTestingModule, FormsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

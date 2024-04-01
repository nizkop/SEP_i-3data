import { Component } from '@angular/core';
import {Chatroom} from "../../Model/chatroom";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  activeChatroom: Chatroom = new Chatroom();
}

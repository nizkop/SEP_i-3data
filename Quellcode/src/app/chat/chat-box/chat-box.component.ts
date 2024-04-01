import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Chatroom} from "../../Model/chatroom";
import {ChatService} from "../../services/chat-service.service";
import {interval, Subject, Subscription, takeUntil} from 'rxjs';
import {User} from "../../Model/user";
import {UserService} from "../../services/user.service";
import {Message} from "../../Model/message";
import {Type} from "../../Model/type";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit, OnDestroy{
  @Input() chatroom: Chatroom = new Chatroom();
  @Input() startEditing: number = 0;
  @Output() messageUpdated = new EventEmitter<Message>();
  @Output() messageDeleted = new EventEmitter<number>();
  messages:Message[]  = [];
  newMessage: string = '';
  profileuser: User = new User();
  private messagePollingSubscription: Subscription = new Subscription();
  private destroy$ = new Subject<void>();
  isEditing: boolean = false;
  editingMessageId?: number= 0;

  constructor(private chatService: ChatService,
              private userService: UserService,
              private http: HttpClient) {}



  ngOnInit() {
    this.getProfileUser();
    this.startMessagePolling();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  startMessagePolling() {
    this.messagePollingSubscription = interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (!this.isEditing) {
          this.loadChatRoomMessages();
        }
      });
  }

  async loadChatRoomMessages() {
    const chatroomId = this.chatroom.id as number;
    if (chatroomId) {
      const messages = await this.chatService.getChatRoomMessages(chatroomId).toPromise();
      const messagePromises = messages.map((message:Message) => this.fetchSenderDetails(message));
      const updatedMessages = await Promise.all(messagePromises);
      this.chatroom.messages = updatedMessages;
    }
  }

  async fetchSenderDetails(message:Message) {
    if (typeof message.sender === 'object' && message.sender !== null && message.sender.hasOwnProperty('id')) {
      // Fetch the sender details using the object form
      const senderId = message.sender.id;
      try {
        const response = await this.userService.getUserById(senderId).toPromise();
        const sender = response;
        if (sender) {
          message.sender = sender;
          message.senderName = sender.userName;
        }
      } catch (error) {
        console.error(`Failed to fetch sender details for message ${message.id}:`, error);
      }
    } else {
      // Fetch the sender details using the ID
      const senderId = message.sender;
      try {
        // @ts-ignore
        const response = await this.userService.getUserById(senderId).toPromise();
        const sender = response; // Assuming the sender data is returned in the 'data' property
        if (sender) {
          message.sender = sender;
          message.senderName = sender.userName;
        }
      } catch (error) {
        console.error(`Failed to fetch sender details for message ${message.id}:`, error);
      }
    }
    return message;
  }


  sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }

    const newMessage: Message = {
      chatRoom: { id: this.chatroom.id } as Chatroom,
      sender: { id: this.profileuser.id } as User,
      senderName: this.profileuser.userName,
      payload: this.newMessage,
      read: false,
      type: Type.DELIVERED,
      createdAt: ""
    };
    this.chatService.postMessage(newMessage).subscribe(
      () => {
        this.newMessage = '';
      },
      (error: any) => {
        console.error('Error sending message:', error);
      }
    );
  }
  updateMessage(message: Message) {

    const updatedMessage = { payload: message.payload, senderName: this.profileuser.userName };
    this.chatService.updateMessage(<number>message.id,updatedMessage).subscribe(
      () => {
        this.messageUpdated.emit(message);
        this.isEditing = false;
      },
      (error: any) => {
        console.error('Error updating message:', error);
      }
    );
  }

  deleteMessage(message:Message ) {
    this.chatService.deleteMessage(<number>message.id).subscribe(
      () => {
        this.messageDeleted.emit(message.id);
      },
      (error: any) => {
        if (error.status === 200) {
          console.log('Message deleted successfully');
        }else{
          console.error('Error deleting message:', error);
        }
      }
    );
  }
  cancelEdit(message:Message){
    this.isEditing = false;
  }
  onStartEditing(messageId: number) {
    this.isEditing = true;
    this.editingMessageId = messageId;
  }

  getProfileUser() : void {
    this.userService.getCurrentUser().subscribe((response:User) => {
      this.profileuser.id = response.id;
    });
  }
  isMessageOwnMessage(message:Message):boolean{
    const senderId = typeof message.sender === 'object' ? message.sender.id : message.sender;
    return senderId === this.profileuser.id;
  }
    isMessageFromCurrentUser(message: Message): boolean {
    const senderId = typeof message.sender === 'object' ? message.sender.id : message.sender;
    return senderId === this.profileuser.id && !message.read;
  }
}

import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import { Message } from "../../Model/message";
import {User} from "../../Model/user";
import {ChatService} from "../../services/chat-service.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements AfterViewInit{

  @Input() message: Message = new Message();
  @Input() messages: Message[] = [];
  @Input() isOwnMessage: boolean = false;
  @Input() isMessageOwnMessage: boolean = false;
  @Input() senderName: string = "";
  @Output() update: EventEmitter<Message> = new EventEmitter<Message>();
  @Output() delete: EventEmitter<Message> = new EventEmitter<Message>();
  @Output() cancel: EventEmitter<Message> = new EventEmitter<Message>();
  @Output() startEditing: EventEmitter<number> = new EventEmitter<number>();
  isEditing: boolean = false;
  updatedContent: string = '';
  private profileuser:User = new User();



  constructor(private chatService:ChatService,
              private userService:UserService) {
  }
  editMessage() {
    this.isEditing = true;
    this.updatedContent = this.message.payload;
    this.startEditing.emit(this.message.id);
  }

  updateMessage() {
    this.message.payload = this.updatedContent;

    this.update.emit(this.message);

    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
    this.cancel.emit(this.message)
  }

  deleteMessage() {
    this.delete.emit(this.message);
  }


  ngAfterViewInit(): void {
    this.chatService.getMessageById(<number>this.message.id).subscribe((temp:Message) =>{
      this.userService.getCurrentUser().subscribe((response:User) => {
        this.profileuser.id = response.id;

        if (temp.sender?.id !== this.profileuser.id && !this.message.read) {
          this.chatService.changeMessageToRead(<number>this.message.id).subscribe(
            () => {},
            (error: any) => {
              console.error('Error marking message as read:', error);
            });
        }
      });
    });

  }
  getProfileUser() : void {
    this.userService.getCurrentUser().subscribe((response:User) => {
      this.profileuser.id = response.id;
    });
  }
}

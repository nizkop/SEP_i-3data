import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Chatroom} from "../../Model/chatroom";
import {ChatService} from "../../services/chat-service.service";
import {User} from "../../Model/user";
import {UserService} from "../../services/user.service";
import {Observable, of, timer} from "rxjs";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit{
  profileuser: User = new User();
  chatRooms: Chatroom[] = [];
  activeChatroomId = 0;
  @Output() selected = new EventEmitter<Chatroom>();
  prfPic: any;
  constructor(private chatService: ChatService,
              private userService: UserService) { }

  ngOnInit() {
    this.getProfileUser();
    this.loadChatRooms();
    timer(1000, 5000).subscribe(() => {
      this.loadChatRooms();
    });
  }
  getProfileUser() : void {
    this.userService.getCurrentUser().subscribe((response:User) => {
      this.profileuser = response;
    });
  }
  loadChatRooms() {
    this.chatService.getUserChatRooms(<number>this.profileuser.id).subscribe((chatrooms: Chatroom[]) => {
      this.chatRooms = chatrooms.filter(chatroom => {
        const users = chatroom.users as User[];
        return users && users.length > 1 && users[0].id !== this.profileuser.id;
      });
    });
  }
  renameChatRoom(chatroomId: number | undefined) {
    if (chatroomId !== undefined) {
      const newChatroomName = prompt('Enter the new name for the chat room:');
      if (newChatroomName && newChatroomName.trim() !== '') {
        const chatroomToUpdate = this.chatRooms.find((chatroom) => chatroom.id === chatroomId);
        if (chatroomToUpdate) {
          chatroomToUpdate.name = newChatroomName.trim();
          this.chatService.updateChatRoomName(chatroomToUpdate, chatroomId).subscribe(
            () => {
              console.log('Chat room name updated successfully.');
            },
            (error: any) => {
              console.error('Error updating chat room name:', error);
            }
          );
        }
      }
    }
  }



  deleteChatRoom(chatroomId: number): Observable<any> {
    if (chatroomId !== undefined) {
      return this.chatService.deleteChatRoom(chatroomId);
    }else {
      // Handle the case when chatroomId is undefined
      console.error('Invalid chatroomId');
      return of(null);
    }
  }
  selectChatroom(chatroom: Chatroom) {
    this.activeChatroomId = <number>chatroom.id;
    this.chatService.getChatRoomMessages(<number>chatroom.id).subscribe(messages => {
      chatroom.messages = messages;
      this.selected.emit(chatroom);
    });
  }
}

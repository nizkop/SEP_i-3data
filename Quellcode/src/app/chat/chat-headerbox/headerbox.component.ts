import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChatService} from "../../services/chat-service.service";
import {UserService} from "../../services/user.service";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../Model/user";
import {Chatroom} from "../../Model/chatroom";

@Component({
  selector: 'app-headerbox',
  templateUrl: './headerbox.component.html',
  styleUrls: ['./headerbox.component.css']
})
export class HeaderboxComponent implements OnInit,OnDestroy{
  @ViewChild('usersDialog') usersDialog: any;
  @ViewChild('groupChatDialog') groupChatDialog: any;
  profileuser:User = new User();
  activeChatroom:Chatroom = new Chatroom();
  users:User[] = [];
  chatRooms: Chatroom[]  =[];
  showUsers = false;
  activeChatroomId = 0;
  groupName: string = '';
  selectedUsers: User[] = [];
  private usersDialogRef: MatDialogRef<any> | undefined;
  private groupChatDialogRef: MatDialogRef<any> | undefined;
  constructor( private chatService: ChatService,
               private userService: UserService,
               private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProfileUser();
  }
  ngOnDestroy(): void {
    if (this.usersDialogRef) {
      this.usersDialogRef.close();
    }

    if (this.groupChatDialogRef) {
      this.groupChatDialogRef.close();
    }
  }

  getProfileUser() : void {
    this.userService.getCurrentUser().subscribe((response:User) => {
      this.profileuser = response;
    });
  }

  createGroup(groupname: string) {
    this.userService.getAllUsers().subscribe(users => {
      const matchedUsers: User[] = users.map(user => ({ ...user }));

      const newChatroom: Chatroom = {
        name: groupname,
        users: [],
        messages: []
      };

      this.chatService.createChatRoom(newChatroom).subscribe((createdChatroom: Chatroom) => {
          const chatroomId = createdChatroom.id;
          const selectedUserIds: number[] = matchedUsers.map(user => user.id);
          selectedUserIds.forEach(userId => {
            this.chatService.addUserToChatRoom(<number>chatroomId, userId).subscribe(
              () => {
                console.log(`User ${userId} added to chatroom ${chatroomId}`);
              },
              (error: any) => {
                console.error(`Error adding user ${userId} to chatroom ${chatroomId}:`, error);
              }
            );
          });

          this.chatRooms.push(createdChatroom);
          this.selectChatroom(createdChatroom);
        },
        (error: any) => {
          console.error('Error creating chatroom:', error);
        });

      this.groupChatDialogRef?.close();
    });
  }



  startChat(user: User) {
    const newChatroom: Chatroom = {
      name: "Private-Chat: " + user.userName,
      users: [],
      messages: []
    };

    this.chatService.createChatRoom(newChatroom).subscribe(
      (createdChatroom: Chatroom) => {
        this.chatService.addUserToChatRoom(<number>createdChatroom.id, user.id).subscribe(
          () => {
            this.chatService.addUserToChatRoom(<number>createdChatroom.id, this.profileuser.id).subscribe(
              () => {
                this.chatRooms.push(createdChatroom);
                this.selectChatroom(createdChatroom);

                if (this.usersDialogRef) { // schließt das Popup-Fenster wieder, weil ein Chat ausgewählt wurde
                  this.usersDialogRef.close();
                }
              },
              (error: any) => {
                console.error('Error adding user to chatroom:', error);
              }
            );
          }
        );
      },
      (error: any) => {
        console.error('Error creating chatroom:', error);
      }
    );

  }
  openUsersDialog() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users.filter(user => user.id !== this.profileuser.id);
      this.openUsersDialogTemplate();
    });
  }
  openUsersDialogTemplate() {
    const dialogConfig: MatDialogConfig = {
      width: '500px',
      maxHeight: '90vh',
      data: { users: this.users }
    };

    this.usersDialogRef = this.dialog.open(this.usersDialog, dialogConfig);
    this.usersDialogRef.afterClosed().subscribe(() => {});
  }
  openGroupChatDialog() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users.filter(user => user.id !== this.profileuser.id);
      this.selectedUsers = [];
      this.openGroupChatDialogTemplate();
    });
  }
  openGroupChatDialogTemplate() {
    const dialogConfig: MatDialogConfig = {
      width: '500px',
      maxHeight: '90vh',
      data: { users: this.users }
    };

    this.groupChatDialogRef = this.dialog.open(this.groupChatDialog, dialogConfig);
    this.groupChatDialogRef.afterClosed().subscribe(() => {});
  }
  toggleUserSelection(user: User) {
    const index = this.selectedUsers.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.selectedUsers.splice(index, 1);
    } else {
      this.selectedUsers.push(user);
    }
  }

  isSelected(user: User): boolean {
    return this.selectedUsers.some(u => u.id === user.id);
  }

  selectChatroom(chatroom: Chatroom) {
    this.activeChatroomId = <number>chatroom.id;
    this.chatService.getChatRoomMessages(<number>chatroom.id).subscribe(messages => {
      chatroom.messages = messages;
      this.activeChatroom = chatroom;
    });
  }
}

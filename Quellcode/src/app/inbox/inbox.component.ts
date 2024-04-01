import { Component, OnInit } from '@angular/core';
import { User } from '../Model/user';
import {UserService} from "../services/user.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit{
  friendRequests: User[] = []; // Declare and initialize the friendRequests property

  constructor(private userService: UserService,
              private httpClient: HttpClient){

  }
  profileuser = new User();

  ngOnInit(){
    this.getProfileuser();
  }

  getProfileuser() {
    this.userService.getCurrentUser().subscribe((response: User) => {
      console.log('Response:', response); // Check the response object in the console
      this.profileuser = response;

      console.log('Friend Requests:', this.profileuser.friendrequests); // Check the friend requests in the console

      this.friendRequests = this.profileuser.friendrequests; // Assign friend requests to the friendRequests property

      console.log('Assigned Friend Requests:', this.friendRequests); // Check the assigned friend requests in the console
      console.log(this.profileuser.friends);
    });
  }

  acceptFriendRequest(friendRequest: User) {
    // Logic for accepting friend request
      // @ts-ignore
    this.httpClient.put<any>(`http://localhost:8080/User/${friendRequest.id}/acceptrequest`, this.profileuser.id, {responseType:'text'})
        .subscribe(
          (response: any) => {
            // Erfolgreiche Antwort vom Server
            console.log(response);
          },
          (error: any) => {
            console.error('inbox: Fehler beim Senden der Freundschaftsanfrage:', error);
          }
        );
    this.userService.updateUser(this.profileuser.id, this.profileuser).subscribe(() => {
      this.getProfileuser();
    });
  }

  rejectFriendRequest(friendRequest: User) {
    this.httpClient.put<any>(`http://localhost:8080/User/${friendRequest.id}/declinerequest`, this.profileuser.id, )
      .subscribe(
        (response: any) => {
          // Erfolgreiche Antwort vom Server
          console.log(response);
          // Weitere Verarbeitung der Antwort, falls erforderlich
        },
        (error: any) => {
          // Fehlerbehandlung
          console.error('Reject: Fehler beim Ablehnen der Freundschaftsanfrage:', error);
        }
      );
    this.userService.updateUser(this.profileuser.id, this.profileuser).subscribe(() => {
      this.getProfileuser();
    });
    // Logic for rejecting friend request
  }

}

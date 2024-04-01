import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {User} from "../../Model/user";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent {
  @ViewChild('profileContainer', { read: ViewContainerRef, static: true }) container: ViewContainerRef | undefined;
  users: User[] = [];
constructor(private userService: UserService,
            private router : Router) {
}
  private apiUrl = 'http://localhost:8080/User';

  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers(): void{
    this.userService.getAllUsers().subscribe((data:  User[]) => {
      this.users = data;
    });
  }
  viewProfile(id: number) {
   this.router.navigateByUrl('/profile/'+id);
  //  this.router.navigate(['/profile', id]);
  }
}

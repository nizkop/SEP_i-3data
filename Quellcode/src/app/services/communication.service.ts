import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../Model/user";

const defaultUser :User = new User();
@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private user = new BehaviorSubject<User>(defaultUser);
  currentUserOb = this.user.asObservable();
  currentUser :User = new User();

  constructor() { }

  setUser(newUser :User){
    this.user.next(newUser);
    this.currentUserOb.subscribe((user :User) => {
      this.currentUser = user;
    });
  }


}

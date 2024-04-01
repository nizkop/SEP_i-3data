import {User} from "./user";
import {Message} from "./message";

export class Chatroom {
  id?: number;
  name:string = "";
  users: (number | User)[] = [];
  messages: Message[] = [];
}

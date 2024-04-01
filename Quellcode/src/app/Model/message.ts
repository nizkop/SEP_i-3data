import {User} from "./user";
import {Chatroom} from "./chatroom";
import {Type} from "./type";

export class Message {
  id?: number;
  payload: string ="";
  sender: User | {id: number} | undefined;
  senderName:string = "";
  chatRoom: Chatroom | {id: number} | undefined;
  read: boolean = false;
  type: Type | undefined;
  createdAt: String = "";
}

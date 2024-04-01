// chat.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Chatroom} from "../Model/chatroom";
import {Message} from "../Model/message";

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private url = 'http://localhost:8080/chat';

  constructor(private http: HttpClient) {}

  postMessage(message: any): Observable<any> {
    return this.http.post(`${this.url}/messages/send`, message);
  }

  getChatRoomMessages(chatroomId: number): Observable<any> {
    return this.http.get(`${this.url}/chatrooms/${chatroomId}/messages`);
  }

  getNewMessages(chatroomId: number, lastMessageId: number | null): Observable<any> {
    return this.http.get(`${this.url}/chatrooms/${chatroomId}/messages/new`, {params: {lastMessageId: `${lastMessageId}`}});
  }

  addUserToChatRoom(chatroomId: number, userId: number): Observable<any> {
    return this.http.post(`${this.url}/chatrooms/${chatroomId}/users/${userId}`, {});
  }

  createChatRoom(chatRoom: Chatroom): Observable<any> {
    return this.http.post(`${this.url}/chatrooms/create`, chatRoom);
  }

  updateChatRoomName(chatRoom:Chatroom, chatroomId:number):Observable<any>{
    return this.http.put(`${this.url}/chatrooms/${chatroomId}/updateName`, chatRoom)
  }
  deleteChatRoom(chatroomId:number):Observable<any>{
    return this.http.delete(`${this.url}/chatrooms/${chatroomId}/delete`)
  }
  getAllChatRooms(): Observable<any> {
    return this.http.get(`${this.url}/chatrooms/get-all`);
  }

  getUserChatRooms(userId: number):Observable<any> {
    return this.http.post(`${this.url}/chatrooms/users/${userId}/getChatRooms`,{})
  }

  updateMessage(messageId: number, message:any):Observable<any>{
    return this.http.put(`${this.url}/chatrooms/messages/${messageId}/update`,message)
  }
  deleteMessage(messageId:number):Observable<any>{
    return this.http.delete(`${this.url}/chatrooms/messages/${messageId}/delete`)
  }
  getMessageById(messageId:number){
    return this.http.get<Message>(`${this.url}/chatrooms/messages/${messageId}/getMessage`);
  }
  changeMessageToRead(messageId:number):Observable<any>{
    return this.http.post(`${this.url}/chatrooms/messages/${messageId}/isRead`,{})
  }
}


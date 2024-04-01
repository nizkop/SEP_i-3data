import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ChatBotMessage} from "../Model/chatBotMessage";
import {UserMessageRequest} from "../Model/userMessageRequest";
import {BotMessageResponse} from "../Model/botMessageResponse";

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {
 private  apiUrl :string = 'http://localhost:8080/chat-bot';


  constructor(private http: HttpClient) { }

  postMessage(message: UserMessageRequest): Observable<BotMessageResponse> {
    const url = `${this.apiUrl}/chatWithBot`;
    return this.http.post<BotMessageResponse>(url, message);
  }


}

import {Component, OnInit} from '@angular/core';
import {ChatBotService} from "../services/chatBot.service";
import {ChatBotMessage} from "../Model/chatBotMessage";
import {HttpClient} from "@angular/common/http";
import { UserMessageRequest } from '../Model/userMessageRequest';
import { BotMessageResponse } from '../Model/botMessageResponse';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css'],
})
export class ChatBotComponent implements OnInit{
  messages: ChatBotMessage[] = [];
  userInput: string = '';

  constructor(private chatBotService: ChatBotService) {}

  ngOnInit() {
    this.messages.push({
      content: 'Hallo, wie kann ich dir helfen?',
      sender: 'bot'
    });
  }


  sendMessage() {
    if (this.userInput.trim() !== '') {
      const userMessage: UserMessageRequest = {
        content: this.userInput
      };
      this.messages.push({
        content: this.userInput,
        sender: 'user'
      });

      this.chatBotService.postMessage(userMessage).subscribe(
        (botResponse: BotMessageResponse) => {
          this.messages.push({
            content: botResponse.response,
            sender: 'bot'
          });
        },
        error => {
          console.log('Error:', error);
        }
      );

      this.userInput = '';
    }
  }




}

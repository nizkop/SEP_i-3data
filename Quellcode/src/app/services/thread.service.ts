import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Ticket} from "../Model/ticket";
import {Thread} from "../Model/thread";
import {Article} from "../Model/article";

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  url :String = 'http://localhost:8080/thread';
  constructor(private http :HttpClient) { }

  createThread(thread :Thread){
    return this.http.post<Thread>(`${this.url}/newThread`, thread);
  }

  getAllThreads(){
    return this.http.get<Thread[]>(`${this.url}/get/allThreads`);
  }

  postFavUser(threadId: number, userMail: String){
    return this.http.post<String>(`${this.url}/${threadId}/postFavUser`, userMail);
  }

  removeFavUser(threadId: number, userMail: String){
    return this.http.put<String>(`${this.url}/${threadId}/removeFavUser`, userMail);
  }

  likeThread(threadId: number){
    return this.http.put(`${this.url}/${threadId}/likeThread`, {});
  }

  dislikeThread(threadId: number) {
    return this.http.put(`${this.url}/${threadId}/dislikeThread`, {});
  }
  getThread(entryId: number) {
    return this.http.get<Thread>(`${this.url}/get/${entryId}`);
  }

  sendArticle(entryId: number, comment:Article){
    return this.http.post<Article>(`${this.url}/${entryId}/sendArticle`, comment)
  }

  deleteArticle(entryId: number) {
  return this.http.put<Article>(`${this.url}/${entryId}/deleteArticle`, {});
  }
}

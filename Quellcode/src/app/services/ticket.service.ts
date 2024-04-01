import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ticket} from "../Model/ticket";
import {User} from "../Model/user";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  url :String = 'http://localhost:8080/ticket';

  constructor(private http :HttpClient) { }

  postTicket(ticket :Ticket){
    return this.http.post<Ticket>(`${this.url}/post`, ticket);
  }

  getAllTickets() {
    return this.http.get<Ticket[]>(`${this.url}/get`);
  }

  getTicketById(id :number){
    return this.http.get<Ticket>(`${this.url}/get/ticket/${id}`);
  }

  updateTicketStatus(userid :number, status :String){
    return this.http.put<String>(`${this.url}/update/${userid}`, status);
  }
}

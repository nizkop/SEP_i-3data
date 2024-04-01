import { Component } from '@angular/core';
import {TicketService} from "../../services/ticket.service";
import {Router} from "@angular/router";
import {Ticket} from "../../Model/ticket";

@Component({
  selector: 'app-admin-ticketview',
  templateUrl: './admin-ticketview.component.html',
  styleUrls: ['./admin-ticketview.component.css']
})
export class AdminTicketviewComponent {
  tickets :Ticket[] = [];

  constructor(private ticketService :TicketService,
              private router :Router) {
  }

  ngOnInit(){
    this.getAllTickets();
  }


  getAllTickets(){
    this.ticketService.getAllTickets().subscribe(
      (data :Ticket[]) => {
        this.tickets = data;
        console.log(this.tickets[0]);
        console.log(this.tickets[1]);
      },
      (error) =>{
        console.error(error);
      }
    );
  }
}

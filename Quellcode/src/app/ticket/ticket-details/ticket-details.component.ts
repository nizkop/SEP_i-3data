import {Component, ElementRef, ViewChild} from '@angular/core';
import {User} from "../../Model/user";
import {HttpClient} from "@angular/common/http";
import {TicketService} from "../../services/ticket.service";
import {Ticket} from "../../Model/ticket";
import {ActivatedRoute, Router} from "@angular/router";
import {EmailService} from "../../services/email.service";

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent  {
  @ViewChild('id', {static: true}) id!: ElementRef;
  @ViewChild('betreff', {static: true}) betreff!: ElementRef;
  @ViewChild('status', {static: true}) status!: ElementRef;
  @ViewChild('kategorie', {static: true}) kategorie!: ElementRef;
  @ViewChild('inhalt', {static: true}) inhalt!: ElementRef;

  ticket :Ticket = new Ticket();

  constructor(private http :HttpClient,
              private ticketService :TicketService,
              private route :ActivatedRoute,
              private emailSenderService :EmailService,
              private router :Router) {}

  ngOnInit(){
    this.getTicket();
  }

  ticketFinished(){
    if(this.ticket.status === "in Bearbeitung") {
      this.changeTicketStatus();
      this.sendConfirmMail();
    }
    this.router.navigate(['/ticketview'])
  }

  sendConfirmMail(){
    this.emailSenderService.ticketIsFinished(this.ticket.writtenByMail).subscribe(
      () => console.log("Mail wurde gesendet!"),
      (error) => console.log(error));
  }

  changeTicketStatus(){
    this.ticketService.updateTicketStatus(this.ticket.id, 'Erledigt!').subscribe(
      (response) =>{
        console.log('Status wurde geändert')
      },
      (error) =>{
        console.log(error);
      }
    );
  }

  getTicket(){
    this.ticketService.getTicketById(this.route.snapshot.params['id']).subscribe((data :Ticket) => {
      this.ticket = data;
      this.id.nativeElement.innerHTML = data.id;
      this.betreff.nativeElement.innerHTML = data.betreff;
      this.status.nativeElement.innerHTML = data.status;
      this.kategorie.nativeElement.innerHTML = data.kategorie;
      this.inhalt.nativeElement.innerHTML = data.nachricht;
    })
  }

}

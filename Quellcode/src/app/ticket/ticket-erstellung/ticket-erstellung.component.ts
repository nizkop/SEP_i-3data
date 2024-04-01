import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";
import {Ticket} from "../../Model/ticket";
import {TicketService} from "../../services/ticket.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../Model/user";

@Component({
  selector: 'app-ticket-erstellung',
  templateUrl: './ticket-erstellung.component.html',
  styleUrls: ['./ticket-erstellung.component.css']
})
export class TicketErstellungComponent {
  betreff :string = "";
  nachricht :string = "";
  options = ['Fehler im Datensatz', 'Fehlverhalten vom User', "Sonstiges"];
  selectedOption: string = "";
  currentUser :User = new User();
  fehlermeldung ="";

  constructor(private ticketService :TicketService,
              private router :Router,
              private userService :UserService) {

  }

  ngOnInit(){
    this.getProfileUser();
  }

  onSelectionChange(value: string){
    this.selectedOption = value;
    console.log('auswahl geändert:', value);
  }

  getProfileUser(){
    this.userService.getCurrentUser().subscribe((data :User) => {
      this.currentUser = data;
    });
  }

  submit(){
    if(this.betreff.trim() !== "" && this.nachricht.trim() !== "") {
      const ticket = {
        id: 0,
        kategorie: this.selectedOption,
        betreff: this.betreff,
        nachricht: this.nachricht,
        status: "offen",
        writtenByMail: this.currentUser.email
      };

      console.log(ticket);

      this.ticketService.postTicket(ticket).subscribe(
        (response: any) => {
          console.log("Ticket wurde gesendet!");
        },
        (error) => {
          console.error(error);
        }

      );

      this.betreff = "";
      this.nachricht = "";
      this.fehlermeldung = "";
    }
    else{
      this.fehlermeldung = "Bitte füllen Sie alle Felder aus!"
    }
  }

  meineTickets(){
    this.router.navigate(['/ticketview']);
  }

}

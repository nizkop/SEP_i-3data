import {Component} from '@angular/core';
import {Ticket} from "../../Model/ticket";
import {TicketService} from "../../services/ticket.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../Model/user";
import {UserRole} from "../../Model/userrole";

@Component({
  selector: 'app-ticketview',
  templateUrl: './ticketview.component.html',
  styleUrls: ['./ticketview.component.css']
})
export class TicketviewComponent {
  tickets :Ticket[] = [];
  copy :Ticket[] = [];
  currentUser :User = new User();
  isAdmin = false;

  constructor(private ticketService :TicketService,
              private router :Router,
              private userService :UserService) {}
  ngOnInit(){
    this.getCurrentUser().then(() => {
      this.getAllTickets();
    });

  }

  getCurrentUser() {
    return new Promise<void>((resolve, reject) => {
      this.userService.getCurrentUser().subscribe(
        (user: User) => {
          this.currentUser = user;
          if (user.role != undefined) {
            if (user.role.toString() === UserRole[UserRole.ADMIN]) {
              this.isAdmin = true;
            }
          }
          resolve(); // Promise auflösen, wenn getCurrentUser() abgeschlossen ist
        },
        (error) => {
          console.log(error);
          reject(); // Promise ablehnen, wenn ein Fehler auftritt
        }
      );
    });
  }



  async getAllTickets() {
    try {
      // @ts-ignore
      this.copy = await this.ticketService.getAllTickets().toPromise();

      if (!this.isAdmin) {
        this.tickets = this.copy.filter(ticket => ticket.writtenByMail === this.currentUser.email);
        console.log(this.tickets + "if case")
      } else {
        this.tickets = this.copy;
        console.log(this.tickets+ "else case");
      }
    } catch (error) {
      console.error(error);
    }
  }
  ticketErstellung(){
    this.router.navigate(['/ticketerstellung']);
  }

  async viewTicket(id: number) {
    if (this.checkTicketStatus(id)) {
      try {
        await new Promise<void>((resolve, reject) => {
          this.ticketService.updateTicketStatus(id, 'in Bearbeitung').subscribe(
            (response) => {
              console.log('Status wurde geändert');
              resolve(); // Auflösen des Promises, wenn der Status erfolgreich geändert wurde
            },
            (error) => {
              console.log(error);
              reject(); // Ablehnen des Promises bei einem Fehler
            }
          );
        });
      } catch (error) {
        console.log(error); // Fehlerbehandlung
      }
    }
    this.router.navigate(['/ticketdetails/' + id]);
  }


  checkTicketStatus(id :number)  {
    for(let i = 0; i < this.tickets.length; i++){
      if(this.tickets[i].id==id && this.tickets[i].status == "offen"){
        return true;
      }
    }
    return false;
  }
}

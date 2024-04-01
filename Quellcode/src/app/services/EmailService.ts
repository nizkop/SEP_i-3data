import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class EmailService{

  private emailUrl = "http://localhost:8080/api/email/send";
  private emailUrlReg = "http://localhost:8080/api/email/register";
  private emailUrlFr = "http://localhost:8080/api/email/anfrage";
  private emailTicket = "http://localhost:8080/api/email/ticketisfinished";

  constructor(private http: HttpClient){}

  getVerificationCode()   {
    return this.http.get<string[]>(this.emailUrl);
  }

  sendEmail(emailAddress :string){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(this.emailUrl, emailAddress, {responseType: 'text'});
  }

  sendRegisterMail(emailAddress :string){
    // console.log("sendEmail in EmailService(", this.emailUrl, ",", emailAddress, ")");
    const headers = new HttpHeaders().set('Content-Type', 'text/plain'); // set headers
    return this.http.post(this.emailUrlReg, emailAddress, {responseType: 'text'});
  }


  sendAnfragemail(emailAddress :string) {
    console.log("Anfragemail");
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    console.log(this.emailUrlFr, emailAddress);
    return this.http.post(this.emailUrlFr, emailAddress, {responseType: 'text'});
  }
  ticketIsFinished(emailAddress :String){
    console.log("Ticket finised Mail");
    return this.http.post(this.emailTicket, emailAddress, {responseType: 'text'});

  }

}

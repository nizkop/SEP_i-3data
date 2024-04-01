import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class EmailService{


  private urlBasis = "http://localhost:8080/api/email/";
  private emailUrl = "send";
  private emailUrlReg = "register";
  private emailUrlFr = "anfrage";
  private emailTicket = "ticketisfinished";
  private emailForum ="forumpost";

  constructor(private http: HttpClient){}

  getVerificationCode()   {
    return this.http.get<string[]>(this.urlBasis+this.emailUrl);
  }

  sendEmail(emailAddress :string){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(this.urlBasis+this.emailUrl, emailAddress, {responseType: 'text'});
  }

  sendRegisterMail(emailAddress :string){
    // console.log("sendEmail in EmailService(", this.emailUrl, ",", emailAddress, ")");
    const headers = new HttpHeaders().set('Content-Type', 'text/plain'); // set headers
    return this.http.post(this.urlBasis+this.emailUrlReg, emailAddress, {responseType: 'text'});
  }


  sendAnfragemail(emailAddress :string) {
    console.log("Anfragemail");
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    console.log(this.urlBasis+this.emailUrlFr, emailAddress);
    return this.http.post(this.urlBasis+this.emailUrlFr, emailAddress, {responseType: 'text'});
  }
  ticketIsFinished(emailAddress :String){
    console.log("Ticket finised Mail");
    return this.http.post(this.urlBasis+this.emailTicket, emailAddress, {responseType: 'text'});

  }

  sendForumnotif(emailAdress: String){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this.http.post(this.urlBasis+this.emailForum, emailAdress, {responseType: 'text'});
  }

}

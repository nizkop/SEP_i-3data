import {Component, ElementRef, ViewChild} from '@angular/core';
import { EmailService } from "../services/EmailService";
import {CommunicationService} from "../services/communication.service";
import {Observable} from "rxjs";
import {User} from "../Model/user";
import {Router} from "@angular/router";
import {CanComponentDeactivate} from "../authenticator/can-deactivate.guard";

@Component({
  selector: 'app-two-fa',
  templateUrl: './two-fa.component.html',
  styleUrls: ['./two-fa.component.scss']
})
export class TwoFAComponent implements CanComponentDeactivate{
  public verificationCode :string = "";
  code :Observable<string[]> = this.emailService.getVerificationCode();
  securityCodes :string[]  = ["" , ""];
  private twoFactorAuthCompleted: boolean | undefined;


  constructor(private emailService: EmailService, private communicationService :CommunicationService, public router :Router) {}

  @ViewChild('error', {static: false}) error! :ElementRef<HTMLParagraphElement>;
  verifyCode(){
    this.emailService.getVerificationCode().subscribe(value => {
      this.twoFactorAuthCompleted = false;
      this.securityCodes = value;
      if(this.verificationCode == this.securityCodes[0] || this.verificationCode == this.securityCodes[1]){
        this.twoFactorAuthCompleted = true;
        this.router.navigate(['dashboard']).then(() => {
          window.location.reload(); // Seite muss 1x neu laden, damit erkannt wird, ob Nutzer Admin ist (und nicht verspätet) + damit das aktualisierte Hamburgermenü angezeigt wird
        });
      }
      else {
        this.error.nativeElement.innerHTML = 'Der angegebene Authentifizierungscode ist falsch. Bitte versuchen Sie es erneut!'
      }
    });
  }
  canDeactivate(): Observable<boolean> | boolean {
    if (this.twoFactorAuthCompleted) {
      return true;
    } else {
      alert('You have not completed the 2-FA process yet.');
      return false;
    }
  }

  sendCodeAgain(){

    this.emailService.sendEmail(this.communicationService.currentUser.email).subscribe(
      () => {
        console.log('Email gesendet!')
      },
      (error) => console.error(error)
    )
  }

}

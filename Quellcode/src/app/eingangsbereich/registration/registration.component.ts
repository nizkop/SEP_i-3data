import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../authenticator/auth.service';
import { Router } from '@angular/router';
import{User} from "../../Model/user";
import {UserRole} from "../../Model/userrole";
import {EmailService} from "../../services/email.service";
import {UserService} from "../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{
  // Nutzer-Daten:
  email = '';
  password = '';
  userName = '';
  birthDate = new Date();
  prfPicture=  '';
  firstName = '';
  lastName ='';
  role: UserRole |undefined;
  isChecked: boolean | undefined;
  roleString = "ADMIN";
  birthdateJava = ""; // Geburtsdatum im Format für User-Klasse

  users: User[] = [];
  private emailCopy : HTMLInputElement | null = null;
  private passwordCopy : HTMLInputElement | null = null;
  private dateOfBirth : HTMLInputElement | null = null;


  constructor(private authService: AuthService,
              private router: Router,
              private emailService: EmailService,
              private userService: UserService) {
  }

  ngOnInit(): void { // Fkt. aus Interface = muss implementiert werden
  }



  checks(){
    this.testfunktion();
    this.emailCopy = document.getElementById("emailCopy") as HTMLInputElement;
    this.passwordCopy = document.getElementById("passwordCopy") as HTMLInputElement;
    this.dateOfBirth = document.getElementById("birthDate") as HTMLInputElement;

    // Checks durchgehen und Fehlermeldungen sammeln:
    let warning = "";
    warning = warning.concat(this.checkName());
    warning = warning.concat(this.checkDateOfBirth());
    warning = warning.concat(this.checkNutzername());
    warning = warning.concat(this.checkEmail());
    warning = warning.concat(this.checkPwd());

    return warning;
  }

  register() {
    if(this.isChecked){
      this.roleString = 'ADMIN'
    }
    if(!this.isChecked){
      this.roleString = 'USER'
    }

    let warning = this.checks();
    if (warning.length > 0 ){
      alert(warning);
    }
    else {

      const user = {
        email: this.email,
        password: this.password,
        userName: this.userName,
        birthDate: this.birthdateJava,
        role: this.roleString,
        prfPicture: this.prfPicture,
        favData: "$",
        firstName: this.firstName,
        lastName: this.lastName
      };

      this.authService.register(user).subscribe(
        (response: any) => {
          this.sendCode();
          this.login(); // generieren der Tokens, um nacch two-fa eingeloggt zu werden
        },
        (error) => {
          if (error.status === 409) {
            console.log("Fehler 409:", error.error);
            if (error.error === 'EmailConflict') {
              alert('Die E-Mail ist bereits registriert. Bitte verwenden Sie eine andere E-Mail.');
            } else if (error.error === 'UserNameConflict') {
              alert('Der Nutzername ist bereits vergeben. Bitte wählen Sie einen anderen Nutzernamen.');
            } else {
              alert('Der Nutzername oder die E-Mail-Adresse ist bereits vergeben. Bitte wählen Sie einen anderen Wert.');
            }
          } else {
            console.error('Fehler bei der Registrierung:', error);
          }
        }
        );
    }
  }


  // Hilfsfunktionen:
  testfunktion(): void {
  }

  login(): void{ //ausgelagert, da Nutzer ja erst registriert sein muss
    console.log("Loginversuch in Registrierung");
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response: any) => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        console.log("Antwort ", response);
      });
    this.router.navigate(['/two-fa']);
  }

  sendCode(){
    this.emailService.sendRegisterMail(this.email).subscribe(
      () => console.log('Email gesendet an ',this.email,'!'),
      (error) => console.error(error)
    )
  }




// Eingaben prüfen:
  checkName(): string
  {
    // console.log("Namen:", this.firstName, this.lastName);
    if (this.firstName.length == 0 || this.lastName.length == 0){
      return "Bitte geben Sie Ihren Namen ein.\n"
    }
    return "";
  }

  checkEmail():string
  {
    // console.log("checkEmail"); // if string/number then do something
    if (this.email.length == 0 ){
      return "Es wird eine E-Mail-Adresse benötigt.\n"
    }
    if (this.emailCopy == null || this.emailCopy.value == null || this.emailCopy.value.length == 0 ){
      return "Bitte wiederholen Sie Ihre E-Mail-Adresse.\n"
    }
    // @ts-ignore     // Objekt könnte null sein -> Fehler unterdrückt
    if (this.email.match(this.emailCopy.value) === null) {
      return "Ihre E-Mail-Eingaben nicht identisch.\n";
    }
    // @ts-ignore
    if (this.email.indexOf("@") >= 0 && this.email.indexOf(".") >= 0) {
      return "";
    }
    else {
      return "Die angegebene E-Mail-Adresse ist ungültig.\n";
    }
  }

  checkPwd(): string
  {
    // console.log("checkPWD()", this.password, typeof this.password, this.password?.nodeValue); //,, this.password.value);
    if (this.password.length == 0){
      return "Es muss ein Passwort gewählt werden.\n"
    }
    // @ts-ignore
    if (this.password.length < 5){
      return "Das Passwort muss aus mindestens 5 Zeichen bestehen.\n"
    }
    if (this.passwordCopy == null || this.passwordCopy.value == null || this.passwordCopy.value.length == 0){
      return "Bitte wiederholen Sie das Passwort.\n"
    }
    // @ts-ignore
    if (this.password.match(this.passwordCopy.value) == null || this.password.length != this.passwordCopy.value.length) {
      return "Die Passworteingaben stimmen nicht überein.\n";
    }
    return "";
  }


  checkDateOfBirth(): string
  {
    // @ts-ignore
    // console.log("Geburtsdatum", this.birthDate, typeof this.dateOfBirth);
    if (this.dateOfBirth == null || this.dateOfBirth.toString() == "" ||  this.dateOfBirth.valueAsDate == null ){
      return "Bitte geben Sie Ihr Geburtsdatum ein.\n"
    }

    // @ts-ignore
    if ( this.dateOfBirth.valueAsDate.getFullYear() >= new Date().getFullYear() || this.dateOfBirth.valueAsDate.getFullYear() < 1900 )
    {
      return "Bitte kontrollieren Sie das Geburtsdatum.\n"
    }
    // Umformatiertes Datum:
    const year = this.dateOfBirth.valueAsDate.getFullYear();
    const month = (this.dateOfBirth.valueAsDate.getMonth() + 1).toString().padStart(2, '0');
    const day = this.dateOfBirth.valueAsDate.getDate().toString().padStart(2, '0');
    this.birthdateJava = `${year}-${month}-${day}`;
    // zurückgeben, dass alles ok
    return "";
  }

  checkNutzername(): string
  {
    if (this.userName.length == 0){
      return "Bitte wählen Sie einen Nutzernamen.\n"
    }
    return "";
  }



  // Getter und Setter für Tests in .spec
  public getDateOfBirth(): HTMLInputElement | null {
    return this.dateOfBirth;
  }

  public getPasswordCopy(): HTMLInputElement | null {
    return this.passwordCopy;
  }

  public getEmailCopy(): HTMLInputElement | null {
    return this.emailCopy;
  }

  setEmailCopy(element: HTMLInputElement | null): void {
    this.emailCopy = element;
  }

  setPasswordCopy(element: HTMLInputElement | null): void {
    this.passwordCopy = element;
  }

  setDateOfBirth(element: HTMLInputElement | null): void {
    this.dateOfBirth = element;
  }


}

import {Component, Injectable, OnInit, ElementRef, ViewChild, OnDestroy} from '@angular/core';
import { UserService} from "../services/user.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Router, } from "@angular/router";
import {User} from "../Model/user";
import {CommunicationService} from "../services/communication.service";
import {EmailService} from "../services/EmailService";
import {AuthService} from "../authenticator/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent implements OnInit {
  username :string = "";
  password :string = "";
  user :User = new User();
  email: string = "";



  constructor(private userService :UserService,
              private router :Router,
              private communicationService :CommunicationService,
              private emailService :EmailService,
              private authService: AuthService) {
  }

  //@ViewChild('fehler', {static: false}) fehler! :ElementRef<HTMLParagraphElement>;

  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response: any) => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        console.log(response)
        this.router.navigate(['two-fa']);
        this.emailService.sendEmail(this.email).subscribe(
          () => console.log('verification send!'),
          (error) => {
            console.error(error);
            alert('An error occurred while sending email: ' + error.message);
          }
        );
      },
      (error) => {
        console.error(error);
        alert('An error occurred during login: ' + error.message);
        //this.fehler.nativeElement.innerHTML = 'Das angegebene Passwort ist falsch';
        // Handle error, display a message, or redirect to an error page
      }
    );
  }
}



import {Component, OnDestroy} from '@angular/core';
import { AuthService } from '../authenticator/auth.service';
import { Router } from '@angular/router';
import{User} from "../Model/user";
import {UserRole} from "../Model/userrole";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent{
  // Add your form fields as properties
  email = '';
  password = '';
  userName = '';
  birthDate = '';
  prfPicture=  '';
  firstName = '';
  lastName ='';
  role: UserRole |undefined;
  isChecked: boolean | undefined;
  roleString = "";

  constructor(private authService: AuthService,
              private router: Router) {

  }

  register() {

    if(this.isChecked){
      this.roleString = 'ADMIN'
    }
    if(!this.isChecked){
      this.roleString = 'USER'
    }
    let birthDateString = '';
    if (this.birthDate) {
      birthDateString = new Date(this.birthDate).toISOString().split('T')[0];
    }
    //todo checks
    const user = {

      email: this.email,
      password: this.password,
      userName: this.userName,
      birthDate: birthDateString,
      role: this.roleString,
      prfPicture: this.prfPicture,
      favData: "",
      firstName: this.firstName,
      lastName: this.lastName
    };

    this.authService.register(user).subscribe(
      (response: any) => {

        this.router.navigate(['/two-fa']);
      },
      (error) => {
        console.error(error);
        // Handle error, display a message, or redirect to an error page
      }
    );
  }

}

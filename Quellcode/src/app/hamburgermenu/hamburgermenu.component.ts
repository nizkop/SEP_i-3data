import {AfterContentInit, Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../authenticator/auth.service";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {MatSidenav} from "@angular/material/sidenav";
import {User} from "../Model/user";
import {UserService} from "../services/user.service";


@Component({
  selector: 'app-hamburgermenu',
  templateUrl: './hamburgermenu.component.html',
  styleUrls: ['./hamburgermenu.component.css']
})

export class HamburgermenuComponent implements OnInit{
  profileuser= new User();
  menuOpen: boolean = false;
  constructor(private router:Router,
              private http:HttpClient,
              private userService:UserService) {

  }
@ViewChild('sidenav') sidenav: MatSidenav | undefined;

  ngOnInit(): void {
    this.getProfileUser();
  }
  logoutAndClose() {
    this.logout();
    // @ts-ignore
    this.sidenav.close();
  }
  getProfileUser() {
    this.userService.getCurrentUser().subscribe((response:User) => {
      this.profileuser.id = response.id;
      this.profileuser.firstName = response.firstName;
      this.profileuser.lastName = response.lastName;
      this.profileuser.userName = response.userName;
      this.profileuser.favData = response.favData;
      this.profileuser.email = response.email;
      this.profileuser.password = response.password;
      this.profileuser.role = response.role;
      this.profileuser.birthDate = response.birthDate;
      this.profileuser.prfPicture = response.prfPicture;
    });
  }
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.http.get(`http://localhost:8080/auth/logout`)
    this.router.navigate(['/login']);
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


  onButtonClick() {
    this.router.navigateByUrl('/profile/'+this.profileuser.id);
    // @ts-ignore
    this.sidenav.close();
  }

}

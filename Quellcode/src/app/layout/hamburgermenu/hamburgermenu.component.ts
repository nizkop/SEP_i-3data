import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatSidenav} from "@angular/material/sidenav";
import {User} from "../../Model/user";
import {UserService} from "../../services/user.service";
import {UserRole} from "../../Model/userrole";


@Component({
  selector: 'app-hamburgermenu',
  templateUrl: './hamburgermenu.component.html',
  styleUrls: ['./hamburgermenu.component.css']
})

export class HamburgermenuComponent implements OnInit{
  profileuser= new User();
  menuOpen: boolean = false;
  isAdmin: boolean = false;

  constructor(private router:Router,
              private http:HttpClient,
              private userService:UserService) {

  }
@ViewChild('sidenav') sidenav: MatSidenav | undefined;

  ngOnInit(): void {
    this.getProfileUser();
  }

  navigateToDashboard(){
    this.router.navigateByUrl('/dashboard');
  }
  logoutAndClose() {
    this.logout();
    // @ts-ignore
    this.sidenav.close();
  }
  getProfileUser() {
    this.userService.getCurrentUser().subscribe((response:User) => {
      this.profileuser = response;

      if(response != undefined && response.role != undefined){
        this.isAdmin = response.role.toString() === UserRole[UserRole.ADMIN];
        console.log("Vergleich: ", response.role.toString() , " ", UserRole[UserRole.ADMIN], " -> ",  response.role.toString() === "ADMIN");
      }

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
    this.getProfileUser();
    this.router.navigateByUrl('/profile/'+this.profileuser.id);
    // @ts-ignore
    this.sidenav.close();
  }

}

import { Component,OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../Model/user";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {UserRole} from "../Model/userrole";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  implements OnInit {
  profileuser= new User();
  weather:any;
  newsApiKey = '02aa8d6dee314d1fba42c1e5719ea099';
  apiUrl = 'https://newsapi.org/v2/everything?q=Aachen&pageSize=5&apiKey=02aa8d6dee314d1fba42c1e5719ea099';
  news: any;

  isAdmin=false;


  constructor(private http: HttpClient,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.getNews();
    this.getProfileUser();
  }

  getNews() {
    this.http.get(this.apiUrl, {headers: {Authorization: `Bearer ${this.newsApiKey}`}}).subscribe((data: any) => {
      this.news = data;
    });
  }
  getProfileUser() {
    this.userService.getCurrentUser().subscribe((response:User) => {
      this.profileuser = response;
      if(response != undefined && response.role != undefined){
        this.isAdmin = response.role.toString() === UserRole[UserRole.ADMIN];
      }
      console.log("Prfiluser:", this.profileuser);
    });
  }

  onButtonClick() {
    this.router.navigateByUrl('/profile/'+this.profileuser.id);
  }
}

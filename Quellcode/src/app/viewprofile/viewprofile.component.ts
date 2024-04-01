import {Component, Input} from '@angular/core';
import {OnInit} from "@angular/core";
import {User} from "../Model/user";
import {UserService} from "../services/user.service";
import {UserlistComponent} from "../userlist/userlist.component";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {$locationShim} from "@angular/common/upgrade";

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit{
  datas = [
    {name: 'Vornamen Aachen', link: 'usertable/1'},
    {name: 'Sterbefälle Aachen', link: 'usertable/2'},
    {name: 'Anzahl der Arbeitssuchenden in der Städteregion Aachen', link: 'usertable/3'},
    {name: 'Anzahl der Arbeitslosen in der Städteregion Aachen', link: 'usertable/4'},
    {name: 'Mittlere Jahresbevölkerung nach Geschlecht - kreisfreieStädte und Kreise - Jahr (ab 1975)', link: 'usertable/5'},
    {name: 'Privathaushalte- kreisfreie Städte und Kreise – Jahr', link: 'usertable/6'},
    {name: 'Straßenliste Aachen', link: 'usertable/7'},
    {name: 'Geburten der Stadt Aachen nach Monat, 2015-2022', link: 'usertable/8'}
  ];
  profileuser: User = new User();
  dataFavs : string[] = [];
  constructor(private userService: UserService,
              private route : ActivatedRoute,
              private httpClient: HttpClient,
              private router: Router
              ) {}

@Input() userID : number = 0;
  prfPic : any;
  postResponse: any;

  ngOnInit(): void {
    this.getUser();
    this.viewImage();

  }

  onRowClick(data: any) {
    for (let i=0; i<this.datas.length; i++) {
      if (this.datas[i].name==data) {
        window.location.href = "http://localhost:4200/"+this.datas[i].link;
        break;
      }
    }
  }

  convertFavs():void{
    if (this.profileuser.favData.length>1){
      let trimmedstring = this.profileuser.favData.slice(1,-1);
      this.dataFavs = trimmedstring.split('$');
    }
  }

   getUser() : void {
     this.userService.getUserById(this.route.snapshot.params['id']).subscribe((data:  User) => {
       this.profileuser = data;
       this.convertFavs();
     });
  }

  viewImage() {
    this.httpClient.get('http://localhost:8080/User/get/image/' + this.route.snapshot.params['id'])
      .subscribe(
        (res: any) => {
          if (res.image) {
            this.prfPic = 'data:image/jpeg;base64,' + res.image;
          } else {
            this.prfPic = '/assets/defaultpfp/defaultpfp.jpg';
          }
        },
        () => {
          this.prfPic = '/assets/defaultpfp/defaultpfp.jpg';
        }
      );
  }

  navigateToEditProfile() {
    this.router.navigate(['/editprofile', this.profileuser.id]);
  }
}


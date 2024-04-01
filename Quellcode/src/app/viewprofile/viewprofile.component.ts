import {Component, Input} from '@angular/core';
import {OnInit} from "@angular/core";
import {User} from "../Model/user";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {EmailService} from "../services/EmailService";


@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {
  datas = [
    {name: 'Vornamen Aachen', link: 'usertable/1'},
    {name: 'Sterbefälle Aachen', link: 'usertable/2'},
    {name: 'Anzahl der Arbeitssuchenden in der Städteregion Aachen', link: 'usertable/3'},
    {name: 'Anzahl der Arbeitslosen in der Städteregion Aachen', link: 'usertable/4'},
    {
      name: 'Mittlere Jahresbevölkerung nach Geschlecht - kreisfreieStädte und Kreise - Jahr (ab 1975)',
      link: 'usertable/5'
    },
    {name: 'Privathaushalte- kreisfreie Städte und Kreise – Jahr', link: 'usertable/6'},
    {name: 'Straßenliste Aachen', link: 'usertable/7'},
    {name: 'Geburten der Stadt Aachen nach Monat, 2015-2022', link: 'usertable/8'}
  ];
  profileuser: User = new User();
  loggedin: User = new User();
  loggedinid: number = 0;
  dataFavs: string[] = [];
  friends: User[] = [];
  friendrequests: User[] = [];


  private http: any;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private httpClient: HttpClient,
              private router: Router,
              private emailService :EmailService
              ) {
  }

  @Input() userID: number = 0;
  prfPic: any;
  postResponse: any;

  ngOnInit(): void {
    this.getUser();
    this.viewImage();
    this.getFriends();
  }

  onRowClick(data: any) {
    for (let i = 0; i < this.datas.length; i++) {
      if (this.datas[i].name == data) {
        window.location.href = "http://localhost:4200/" + this.datas[i].link;
        break;
      }
    }
  }

  convertFavs(): void {
    if (this.profileuser.favData.length > 1) {
      let trimmedstring = this.profileuser.favData.slice(1, -1);
      this.dataFavs = trimmedstring.split('$');
    }
  }

  getUser(): void {
    this.userService.getUserById(this.route.snapshot.params['id']).subscribe((data: User) => {
      this.profileuser = data;
      this.convertFavs();
      this.userService.getFriendsprivacy(this.profileuser.id).subscribe((friendsPrivacy: boolean) => {
        this.profileuser.friendsPrivate = friendsPrivacy;
        console.log(this.profileuser.friendsPrivate);
      });
    });

  }

  getFriends(): void {
    // @ts-ignore
    this.userService.getFriends(this.route.snapshot.params['id']).subscribe((data: User[]) => {
      this.profileuser.friends = data;
      console.log(this.profileuser.friends);
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

  sendRequest(): void {
    this.userService.getCurrentUser().subscribe((response:User) => {
      this.loggedinid=response.id;
      console.log(response.id);
      console.log(this.loggedinid);
      console.log(this.profileuser.id);
      // @ts-ignore
      this.httpClient.put<any>(`http://localhost:8080/User/${this.profileuser.id}/request`, this.loggedinid, { responseType: 'text' })
        .subscribe(
          (response: any) => {
            // Erfolgreiche Antwort vom Server
            console.log(response);
            // Weitere Verarbeitung der Antwort, falls erforderlich
          },
          (error: any) => {
            // Fehlerbehandlung
            console.error('viewprofile: Fehler beim Senden der Freundschaftsanfrage:', error);
          }
        );
    });
    this.emailService.sendAnfragemail(this.profileuser.email);
  }

  getLoggedinUser()
  {this.userService.getCurrentUser().subscribe((response: User) => {
    console.log('Response:', response); // Check the response object in the console
    this.loggedin.id = response.id;
    this.loggedin.firstName = response.firstName;
    this.loggedin.lastName = response.lastName;
    this.loggedin.userName = response.userName;
    this.loggedin.favData = response.favData;
    this.loggedin.email = response.email;
    this.loggedin.password = response.password;
    this.loggedin.role = response.role;
    this.loggedin.birthDate = response.birthDate;
    this.loggedin.prfPicture = response.prfPicture;
    this.loggedin.friends = response.friends;
    this.loggedin.friendrequests = response.friendrequests;

    });
  }



}

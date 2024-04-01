import {Component} from '@angular/core';
import {User} from "../../Model/user";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router"
import {HttpClient,} from "@angular/common/http";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {SelectdiagramsComponent} from "../selectdiagrams/selectdiagrams.component";

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent {

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
  profileuser = new User();
  uploadedImage: File = new File([""], "");
  postResponse: any;
  successResponse: string = "";
  prfPic: boolean = false;
  prfPicPath: any;
  dataFavs: string[] = [];
  friends: User[] = [];
  selectedCharts: boolean []= [];

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private httpClient: HttpClient,
              private router: Router,
              public dialog: MatDialog,){
  }

  ngOnInit(): void {
    this.getProfileUser();
  }

  convertData(): void {
    console.log(this.profileuser.selectedCharts);
    this.selectedCharts=[];
    for (let i = 0; i<this.profileuser.selectedCharts.length; i++){
      if (this.profileuser.selectedCharts.charAt(i)=="1"){
        this.selectedCharts.push(true);
      }
      else {this.selectedCharts.push(false);
      }

    }
    console.log(this.selectedCharts);
  }

  editProfileView() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50vw';
    dialogConfig.height = '80vh';


    const dialogRef: MatDialogRef<SelectdiagramsComponent> = this.dialog.open(SelectdiagramsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.getProfileUser();
    });
  }

  onRowClick(data: any) {
    for (let i = 0; i < this.datas.length; i++) {
      if (this.datas[i].name == data) {
        window.location.href = "http://localhost:4200/" + this.datas[i].link;
        break;
      }
    }
  }

  viewImage() {
    this.userService.viewImage(this.route).subscribe(
      (imageUrl: string) => {
        if(imageUrl.includes("default")){
          this.prfPic = false;
        } else{
          this.prfPic = true;
        }
        this.prfPicPath = imageUrl;
        // console.log("Profilbild gesetzt:", imageUrl);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
  }

  savePrfPic() {
    if (this.uploadedImage.size >= 3) {
      const imageFormData = new FormData();
      imageFormData.append('file', this.uploadedImage);
      this.httpClient.post('http://localhost:8080/User/upload/image/' + this.profileuser.id.toString(), imageFormData, { observe: 'response' })
        .subscribe((response) => {
          if (response.status === 200) {
            this.postResponse = response;
            this.successResponse = this.postResponse.body.message;
            this.viewImage();
          } else {
            this.successResponse = 'Aufgrund eines Fehler wurde das Bild nicht hochgeladen!';
          }
        });
    } else {
      this.successResponse = 'Es wurde kein Profilbild ausgewählt!';
    }
  }

  deletePrfPic() {
    this.httpClient.delete('http://localhost:8080/User/delete/image/' + this.profileuser.id.toString()).subscribe(
      () => {
        this.prfPic = false;
        // Holen der URL des default-Bildes per viewImage-Funktion des Userservices:
        this.userService.updateUser(this.profileuser.id, this.profileuser).subscribe(() => {
          this.viewImage();
        });
      },
      (error) => {
        alert('Es gab ein Problem.');
      }
    );
  }

  deleteFromFavs(dataname : string){
    let newDataFavs = this.dataFavs.filter(data => data !== dataname);
    this.profileuser.favData = newDataFavs.length > 0 ? '$'+newDataFavs.join('$') + '$' : "";
    this.userService.updateUser(this.profileuser.id, this.profileuser).subscribe(() => {
      this.getProfileUser();
    });
  }

  convertFavs(): void {
    if (this.profileuser.favData.length > 1) {
      let trimmedString = this.profileuser.favData;
      if (trimmedString.startsWith('$')) {
        trimmedString = trimmedString.substring(1);
      }
      if (trimmedString.endsWith('$')) {
        trimmedString = trimmedString.slice(0, -1);
      }
      this.dataFavs = trimmedString.split('$');
    }
    else{this.dataFavs = [];}

  }



  getProfileUser() : void {
      this.userService.getCurrentUser().subscribe((response:User) => {
        this.profileuser = response;
        this.convertFavs();
        this.viewImage();
        this.convertData();
    });

  }

  saveUser(): void{
    this.userService.updateUser(this.profileuser.id, this.profileuser).subscribe();
    this.router.navigate(['/profile/', this.profileuser.id]);
  }

  cancel() : void {
    window.location.reload();
  }


  addToFavs(){
    this.router.navigateByUrl('/dataview');
  }

  toInbox(){
    this.router.navigateByUrl('/inbox');
  }

  deleteFriend(friendId : number) {
    console.log(friendId);
    // @ts-ignore
    this.httpClient.put<any>(`http://localhost:8080/User/${this.profileuser.id}/deletefriend`, friendId, { responseType: 'text' }).subscribe(
      (response: any) => {
        // Erfolgreiche Antwort vom Server
        console.log(response);
        // Weitere Verarbeitung der Antwort, falls erforderlich
      },
      (error: any) => {
        // Fehlerbehandlung
        console.error('Fehler beim Löschen des Freundes:', error);
      }

    );
    this.userService.updateUser(this.profileuser.id, this.profileuser).subscribe(() => {
      this.getProfileUser();
    });
  };
  toggleFriendsPrivate() {
    console.log(this.profileuser.friendsPrivate);
    // @ts-ignore
    this.httpClient.put<any>(`http://localhost:8080/User/togglefriends`, this.profileuser.id, {responseType: 'text'}).subscribe(
      (response: any) => {
        // Erfolgreiche Antwort vom Server
        console.log(response);
        // Weitere Verarbeitung der Antwort, falls erforderlich
      },
      (error: any) => {
        // Fehlerbehandlung
        console.error('Freundesliste konnte nicht umgeschaltet werden:', error);
      });
  }

}

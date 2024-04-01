import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../Model/user";

@Component({
  selector: 'app-dataview',
  templateUrl: './dataview.component.html',
  styleUrls: ['./dataview.component.css']
})
export class DataviewComponent implements OnInit{
  //Liste aller Datensätze
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
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  constructor(private userService: UserService) {
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
      this.convertFavs();
    });
  }

  ngOnInit() {

    this.getProfileUser();
  }

  toggleFav(data: string) {
    if (this.isInFavs(data)) {
      // Datensatz ist bereits ein Favorit, also entfernen
      this.deleteFromFavs(data);
    } else {
      // Datensatz ist kein Favorit, also hinzufügen
      this.addToFavs(data);
    }
  }

  //verbinden der suchfunktion mit dem Suchknopf
  search() {
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        this.searchTable();
      });
    }
  }
  //Suchfunktion für die Tabbelle

  searchTable() {
    const input = this.searchInput.nativeElement.value.toLowerCase();
    const table = document.getElementById('myTable');
    const tr = table?.getElementsByTagName('tr');
    if (tr) {
      for (let i = 0; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName('td')[0];
        if (td) {
          const txtValue = td.textContent || td.innerText;
          if (txtValue.toLowerCase().indexOf(input) > -1) {
            tr[i].style.display = '';
          } else {
            tr[i].style.display = 'none';
          }
        }
      }
    }
  }
  //Verlinkung bei anklicken der Tabellenzeile
  onRowClick(data: any) {
    window.location.href = "http://localhost:4200/"+data.link;
  }

  // getProfileUser() {
  //   this.userService.getUserById(1).subscribe((data:  User) => {
  //     this.profileuser = data;
  //     this.convertFavs();
  //   });
  // }

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


  }

  addToFavs(data:string): void {
    if (this.isInFavs(data)){
      return;
    }
    // Check if there are already favorites present
    if (this.profileuser.favData.length > 0) {
      // If yes, append the new favorite with a $ separator
      this.profileuser.favData += data + "$";
    } else {
      // If no, simply add the new favorite without a $ separator
      this.profileuser.favData += "$"+ data + "$";
    }
    this.userService.updateUser(this.profileuser.id, this.profileuser).subscribe(() => {
      this.getProfileUser();
      this.convertFavs();
    });
    //window.location.reload();
  }


  isInFavs(data:string): boolean{
    for (let i=0; i<this.dataFavs.length; i++){
      if (data==this.dataFavs[i]){
        return true;
      }
    }
    return false;
  }

  deleteFromFavs(dataname : string){
    let newDataFavs = this.dataFavs.filter(data => data !== dataname);
    this.profileuser.favData = newDataFavs.length > 0 ? '$'+newDataFavs.join('$') + '$' : "";
    this.userService.updateUser(this.profileuser.id, this.profileuser).subscribe(() => {
      this.getProfileUser();
    });
  }
}

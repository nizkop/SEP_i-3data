import {Component, ViewChild} from '@angular/core';
import {Privathaushalte} from "../../../Model/privathaushalte";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {Data6Service} from "../../../services/datenservices/data6.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {User} from "../../../Model/user";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-usertable6',
  templateUrl: './usertable6.component.html',
  styleUrls: ['./usertable6.component.scss']
})
export class Usertable6Component {
  data: string='Privathaushalte- kreisfreie Städte und Kreise – Jahr';
  entries: Privathaushalte[] = [];
  dataSource = new MatTableDataSource<any>(this.entries);
  uploadButtonDisabled = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | null=null;
  entryData: Privathaushalte = new Privathaushalte();
  profileuser: User = new User();
  dataFavs : string[] = [];
  displayedColumns: string[] = ['id','jahr','state', 'bezirk', 'city', 'anzahl'];
  namedColumns: string[] = ['ID', 'Jahr', 'Bundesland', 'Bezirk', 'Stadt', 'Anzahl in 1000'];

  constructor(private data6Service: Data6Service,
              private _liveAnnouncer: LiveAnnouncer,
              private userService: UserService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.entries)
    this.getEntries();
    this.getProfileUser();
  }
  ngAfterViewInit(): void{
    this.dataSource = new MatTableDataSource(this.entries);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getProfileUser() {
    this.userService.getCurrentUser().subscribe((response:User) => {
      this.profileuser = response;
      this.convertFavs();
    });
  }

  // Datenbereich:

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  getEntries(): void {
    this.data6Service.getDatensaetze().subscribe((data:  Privathaushalte[]) => {
      this.entries = data;
      this.dataSource.data = this.entries;
    });
  }
  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  async isXMLValid(file: File): Promise<boolean> {
    const content = await file.text();
    const lines = content.split('\n');
    const firstLine = lines[0].trim();
    const expectedHeader = '<?xml version="1.0" encoding="UTF-8"?><genml:GENESIS xmlns:genml="https://www-genesis.destatis.de/xml/GENESIS-ML_V0_3" NAME="12211-201i"><genml:DISPLAY-DATA><genml:LABELS><genml:LABEL NAME="12211-201iFOOTNOTE" POSITION="" VISIBILITY="true"><genml:CAPTION><genml:TEXT LANG="de" FORMAT="text/plain">Ergebnisse des Mikrozensus';

    return firstLine.startsWith(expectedHeader);
  }

  resetEntryData(): void {
    this.entryData = new Privathaushalte();
  }

  // Lieblingsdatensatzauswahl:
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
  deleteFromFavs(data : string){
    let newDataFavs = this.dataFavs.filter(dataentry => dataentry !== data);
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

}

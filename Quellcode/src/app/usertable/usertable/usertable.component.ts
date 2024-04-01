import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { VnNeugeboreneAC } from '../../Model/vn-neugeborene-ac';
import { DataService } from '../../services/data.service';
import {MatTableDataSource} from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {UserService} from "../../services/user.service";
import {User} from "../../Model/user";
import * as d3 from "d3";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {BarChartComponent} from "../../diagram/barchart/bar-chart.component";
import {Diagrammodel} from "../../Model/Diagrammodel";
import {TreeMapComponent} from "../../diagram/treemap/tree-map.component";


@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements OnInit, AfterViewInit{
  url : string ='http://localhost:8080/Datensaetze/table1';
  diagramData: Diagrammodel[]=[];
  highestValue: number | null = null;
  data: string= 'Vornamen Aachen';
  profileuser: User = new User();
  dataFavs : string[] = [];
  entries: VnNeugeboreneAC[] = [];
  dataSource = new MatTableDataSource<any>(this.entries);
  uploadButtonDisabled = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | null=null;
  entryData: VnNeugeboreneAC = new VnNeugeboreneAC();
  displayedColumns: string[] = ['id', 'anzahl', 'vorname', 'geschlecht', 'position'];
  constructor(private dataService: DataService,
              private _liveAnnouncer: LiveAnnouncer,
              private userService: UserService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.entries)
    this.getEntries();
    this.getProfileUser();
  }

  openTreeMap(){
    this.convertData(50);
    const dialogRef = this.dialog.open(TreeMapComponent, {
      width: '1000px',
      height: '600px',
      data: this.diagramData
    })
  }


  openBarChart(){
    this.convertData(30)
    // @ts-ignore
    this.diagramData.sort((a, b) => d3.descending(a.anzahl, b.anzahl));
      const dialogRef = this.dialog.open(BarChartComponent, {
        width: '1000px',
        height: '600px',
        data: this.diagramData
      })

  }
  convertData(length:number){
    this.diagramData=[];
    // @ts-ignore
    this.entries.sort((a, b) => d3.descending(a.anzahl, b.anzahl))
    for (let i = 0; i<length; i++){
      this.diagramData.push({ name: this.entries[i].vorname, zahl: this.entries[i].anzahl })
    }
  }

  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
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

  toggleFav(data: string) {
    if (this.isInFavs(data)) {
      // Datensatz ist bereits ein Favorit, also entfernen
      this.deleteFromFavs(data);
    } else {
      // Datensatz ist kein Favorit, also hinzufügen
      this.addToFavs(data);
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit(): void{
    this.dataSource = new MatTableDataSource(this.entries);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getEntries(): void {
    this.dataService.getDatensaetze().subscribe((data:  VnNeugeboreneAC[]) => {
      this.entries = data;
      this.dataSource.data = this.entries;
    });
  }


  async isCSVValid(file: File): Promise<boolean> {
    const content = await file.text();
    const lines = content.split('\n');
    const header = lines[0].trim();
    const expectedHeader = '"anzahl","vorname","geschlecht","position"';

    return header === expectedHeader;
  }




  resetEntryData(): void {
    this.entryData = new VnNeugeboreneAC();
  }
}


import {Component, ViewChild} from '@angular/core';
import {Arbeitslose} from "../../Model/arbeitslose";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {Data4Service} from "../../services/data4.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {UserService} from "../../services/user.service";
import {User} from "../../Model/user";
import {Diagrammodel} from "../../Model/Diagrammodel";
import {TreeMapComponent} from "../../diagram/treemap/tree-map.component";
import {MatDialog} from "@angular/material/dialog";
import * as d3 from "d3";
import {BarChartComponent} from "../../diagram/barchart/bar-chart.component";

@Component({
  selector: 'app-usertable4',
  templateUrl: './usertable4.component.html',
  styleUrls: ['./usertable4.component.css']
})
export class Usertable4Component {
  diagramData: Diagrammodel[]=[];
  selectedDate: string = '';
  data: string='Anzahl der Arbeitslosen in der Städteregion Aachen';
  entries: Arbeitslose[] = [];
  dataSource = new MatTableDataSource<any>(this.entries);
  uploadButtonDisabled = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | null=null;
  entryData: Arbeitslose = new Arbeitslose();

  profileuser: User = new User();
  dataFavs : string[] = [];

  displayedColumns: string[] = ['id','datum','col1', 'col2', 'col3', 'col4', 'col5','col6','col7', 'col8', 'col9','col10','col11','col12'];
  constructor(private data4Service: Data4Service,
              private _liveAnnouncer: LiveAnnouncer,
              private userService: UserService,
              private dialog: MatDialog) { }
  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.entries)
    this.getEntries();
    this.getProfileUser();
  }
  openBarChart(){
    this.convertData();
    const dialogRef = this.dialog.open(BarChartComponent, {
      width: '1200px',
      height: '600px',
      data: this.diagramData
    })
    this.diagramData=[];
  }
  openTreeMap(){
    this.convertData();
    const dialogRef = this.dialog.open(TreeMapComponent, {
      width: '1000px',
      height: '600px',
      data: this.diagramData
    })
    this.diagramData= [];
  }
  convertData(){
    let nummer = 0;
    for (let i = 0; i<this.entries.length; i++){
      if (this.entries[i].datum==this.selectedDate){
        nummer = i;
      }
    }
    this.diagramData.push({ name: 'Arbeitsuchende (ELB)', zahl: this.entries[nummer].col1 })
    this.diagramData.push({ name: 'Männer', zahl: this.entries[nummer].col2 })
    this.diagramData.push({ name: 'Frauen', zahl: this.entries[nummer].col3 })
    this.diagramData.push({ name: 'unter 25 Jahren', zahl: this.entries[nummer].col4 })
    this.diagramData.push({ name: '25 bis unter 55 Jahren', zahl: this.entries[nummer].col5 })
    this.diagramData.push({ name: '55 Jahre und älter', zahl: this.entries[nummer].col6 })
    this.diagramData.push({ name: 'Langzeitarbeitslose ELB', zahl: this.entries[nummer].col7 })
    this.diagramData.push({ name: 'Männer', zahl: this.entries[nummer].col8 })
    this.diagramData.push({ name: 'Frauen', zahl: this.entries[nummer].col9 })
    this.diagramData.push({ name: 'unter 25 Jahren', zahl: this.entries[nummer].col10 })
    this.diagramData.push({ name: '25 bis unter 55 Jahren', zahl: this.entries[nummer].col11 })
    this.diagramData.push({ name: '55 Jahre und älter', zahl: this.entries[nummer].col12 })
  }

  onDateSelect(date : string){
    this.selectedDate = date;
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
    this.data4Service.getDatensaetze().subscribe((data:  Arbeitslose[]) => {
      this.entries = data;
      this.dataSource.data = this.entries;
    });
  }


  async isCSVValid(file: File): Promise<boolean> {
    const content = await file.text();
    const lines = content.split('\n');
    const header = lines[0].trim();
    const expectedHeader = ';Jan';
    return header.startsWith(expectedHeader);
  }


  resetEntryData(): void {
    this.entryData = new Arbeitslose();
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

}

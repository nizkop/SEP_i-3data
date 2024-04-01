import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { VnNeugeboreneAC } from '../../../Model/vn-neugeborene-ac';
import { DataService } from '../../../services/datenservices/data.service';
import {MatTableDataSource} from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {UserService} from "../../../services/user.service";
import {User} from "../../../Model/user";
import * as d3 from "d3";
import {MatDialog} from "@angular/material/dialog";
import {BarChartComponent} from "../../diagram/barchart/bar-chart.component";
import {Diagrammodel} from "../../../Model/Diagrammodel";
import {TreeMapComponent} from "../../diagram/treemap/tree-map.component";
import {DownloadService} from "../../../services/download.service";
import {ActivatedRoute} from "@angular/router";
import {DownloadbereichComponent} from "../../../downloadbereich/downloadbereich.component";
import {AnsichtsartPopup} from "../../../Model/ansichtsartPopup";


@Component({
  selector: 'app-usertable',
  templateUrl: './usertable1.component.html',
  styleUrls: ['./usertable1.component.scss']
})
export class Usertable1Component implements OnInit, AfterViewInit{
  @ViewChild(DownloadbereichComponent) downloadbereichComponent!: DownloadbereichComponent;
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
  namedColumns: string[] = ['ID', 'Anzahl', 'Vorname', 'Geschlecht', 'Position'];

  constructor(private dataService: DataService,
              private _liveAnnouncer: LiveAnnouncer,
              private userService: UserService,
              private dialog: MatDialog,
              private downloadService: DownloadService,
              private route: ActivatedRoute
              ) {
  }


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


  // Diagramm-Bereich:

  /**
   * anklickbarer Download, um die Daten des aktuellen Datensatzes als PDF herunterzuladen
   * @param checkboxes Auswahl (per Checkbox), ob oder welche Diagramme in die PDF eingefügt werden sollen
   */
  async downloadPDF(checkboxes: { [key: string]: boolean }): Promise<void> {
    console.log("downloadPDF User Tab1", checkboxes);
    if(this.entries.length > 0){
      let diagramme: File[] = [];
      checkboxes["Kuchendiagramm"] = false;
      if(checkboxes["Balkendiagramm"]){
        await this.openBarChart(AnsichtsartPopup.SAVE).toPromise();
        diagramme.push(await this.downloadService.tempPopup());
        this.dialog.closeAll();
      }
      if(checkboxes["Treemap"]){
        await this.openTreeMap(AnsichtsartPopup.SAVE).toPromise();
        diagramme.push( await this.downloadService.tempPopup());
        this.dialog.closeAll();
      }
      this.downloadService.downloadDatensatzPDF(this.displayedColumns, this.data, "1", diagramme, this.namedColumns);
    } else{
      alert("Es sind keine Daten für diesen Datensatz verfügbar, daher kann er leider nicht heruntergeladen werden. ");
      console.log("Abbruch downloadPDF: keine Daten für Download verfügbar");
    }
  }

  openTreeMap(ansichtsart: AnsichtsartPopup = AnsichtsartPopup.STANDARD){
    let width= '1000px';
    let height= '600px';
    if(ansichtsart === AnsichtsartPopup.SAVE) {
      width = '100vw';
      height = '100vh';
    }
    this.convertData(50);
    const dialogRef = this.dialog.open(TreeMapComponent, {
      width: width,
      height: height,
      data: {
        diagramData: this.diagramData,
        ansicht: ansichtsart
      },
    })
    return dialogRef.afterOpened();
  }
  openBarChart(ansichtsart: AnsichtsartPopup = AnsichtsartPopup.STANDARD){
    let width= '1000px';
    let height= '600px';
    if(ansichtsart === AnsichtsartPopup.SAVE) {
      width = '100vw';
      height = '100vh';
    }
    this.convertData(30);
    // @ts-ignore
    this.diagramData.sort((a, b) => d3.descending(a.anzahl, b.anzahl));
    const dialogRef = this.dialog.open(BarChartComponent, {
      width: width,
      height: height,
      data: {
        diagramData: this.diagramData,
        ansicht: ansichtsart
      },
    })
    return dialogRef.afterOpened();
  }
  convertData(length:number){
    this.diagramData=[];
    // @ts-ignore
    this.entries.sort((a, b) => d3.descending(a.anzahl, b.anzahl))
    for (let i = 0; i<length; i++){
      this.diagramData.push({ name: this.entries[i].vorname, zahl: this.entries[i].anzahl })
    }
  }


  // Datenbereich:

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  getEntries(){
    this.dataService.getDatensaetze().subscribe((data:  VnNeugeboreneAC[]) => {
      this.entries = data;
      this.dataSource.data = this.entries;
      if(this.entries.length > 0){
        this.downloadbereichComponent.setActive(true, true, false);
      }
    });
  }
  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
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


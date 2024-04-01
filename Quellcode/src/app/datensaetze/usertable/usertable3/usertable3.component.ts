import {Component, ViewChild} from '@angular/core';
import {Arbeitssuchende} from "../../../Model/arbeitssuchende";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {Data3Service} from "../../../services/datenservices/data3.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {UserService} from "../../../services/user.service";
import {User} from "../../../Model/user";
import {Diagrammodel} from "../../../Model/Diagrammodel";
import {MatDialog} from "@angular/material/dialog";
import {BarChartComponent} from "../../diagram/barchart/bar-chart.component";
import * as d3 from "d3";
import {TreeMapComponent} from "../../diagram/treemap/tree-map.component";
import {DownloadService} from "../../../services/download.service";
import {DownloadbereichComponent} from "../../../downloadbereich/downloadbereich.component";
import {AnsichtsartPopup} from "../../../Model/ansichtsartPopup";

@Component({
  selector: 'app-usertable3',
  templateUrl: './usertable3.component.html',
  styleUrls: ['./usertable3.component.scss']
})
export class Usertable3Component {
  @ViewChild(DownloadbereichComponent) downloadbereichComponent!: DownloadbereichComponent;
  diagramData: Diagrammodel[]=[];
  selectedDate: string = '';
  data: string='Anzahl der Arbeitssuchenden in der Städteregion Aachen';
  entries: Arbeitssuchende[] = [];
  dataSource = new MatTableDataSource<any>(this.entries);
  uploadButtonDisabled = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | null=null;
  entryData: Arbeitssuchende = new Arbeitssuchende();
  profileuser: User = new User();
  dataFavs : string[] = [];
  displayedColumns: string[] = ['id','datum',
    'col1', 'col2', 'col3', 'col4', 'col5',
    'col6','col7', 'col8', 'col9','col10','col11'];
  namedColumns: string[] = ['ID', 'Datum',
    'Arbeitsuchende, Erwerbsfähige, Leistungsberechtigte(ELB)', ' Ohne abgeschlossene Berufsausbildung', 'Betriebliche/schulische Ausbildung',    ' Akademische Ausbildung', 'Ohne Angabe',
    'Kein Hauptschulabschluss', 'Hauptschulabschluss', 'Mittlere Reife', 'Fachhochschulreife', 'Abitur/Hochschulreife', 'Ohne Angabe',
  ];

  constructor(private data3Service: Data3Service,
              private _liveAnnouncer: LiveAnnouncer,
              private userService: UserService,
              private dialog: MatDialog,
              private downloadService: DownloadService,
              ) { }

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
    console.log("downloadPDF User Tab3", checkboxes);
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
      this.downloadService.downloadDatensatzPDF(this.displayedColumns, this.data, "3", diagramme, this.namedColumns);
    } else{
      alert("Es sind keine Daten für diesen Datensatz verfügbar, daher kann er leider nicht heruntergeladen werden. ");
      console.log("Abbruch downloadPDF: keine Daten für Download verfügbar");
    }
  }

  openBarChart(ansichtsart: AnsichtsartPopup = AnsichtsartPopup.STANDARD){
    let width= '1200px';
    let height= '600px';
    if(ansichtsart === AnsichtsartPopup.SAVE) {
      width = '100vw';
      height = '100vh';
    }
    this.convertData();
    // @ts-ignore
    this.diagramData.sort((a, b) => d3.descending(a.zahl, b.zahl));
    const dialogRef = this.dialog.open(BarChartComponent, {
      width: width,
      height: height,
      data: {
        diagramData: this.diagramData,
        ansicht: ansichtsart
      },
    })
    this.diagramData=[];
    return dialogRef.afterOpened();
  }

  openTreeMap(ansichtsart: AnsichtsartPopup = AnsichtsartPopup.STANDARD){
    let width= '1000px';
    let height= '600px';
    if(ansichtsart === AnsichtsartPopup.SAVE) {
       width = '100vw';
       height = '100vh';
    }
    this.convertData();
    const dialogRef = this.dialog.open(TreeMapComponent, {
      width: width,
      height: height,
      data: {
        diagramData: this.diagramData,
        ansicht: ansichtsart
      },
    })
    this.diagramData= [];
    return dialogRef.afterOpened();
  }

  convertData(){
    let nummer = 0;
    for (let i = 0; i<this.entries.length; i++){
      if (this.entries[i].datum==this.selectedDate){
        nummer = i;
      }
    }
    this.diagramData.push({ name: 'Arbeitsuchende (ELB)', zahl: this.entries[nummer].col1 })
    this.diagramData.push({ name: 'Ohne Berufsausbildung', zahl: this.entries[nummer].col2 })
    this.diagramData.push({ name: 'Betriebliche/schulische Ausbildung', zahl: this.entries[nummer].col3 })
    this.diagramData.push({ name: 'Akademische Ausbildung', zahl: this.entries[nummer].col4 })
    this.diagramData.push({ name: 'Ohne Angabe', zahl: this.entries[nummer].col5 })
    this.diagramData.push({ name: 'Kein Hauptschulabschluss', zahl: this.entries[nummer].col6 })
    this.diagramData.push({ name: 'Hauptschulabschluss', zahl: this.entries[nummer].col7 })
    this.diagramData.push({ name: 'Mittlere Reife', zahl: this.entries[nummer].col8 })
    this.diagramData.push({ name: 'Fachhochschulreife', zahl: this.entries[nummer].col9 })
    this.diagramData.push({ name: 'Abitur/Hochschulreife', zahl: this.entries[nummer].col10 })
    this.diagramData.push({ name: 'Ohne Angabe', zahl: this.entries[nummer].col11 })

  }



  // Datenbereich:

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getEntries(): void {
    this.data3Service.getDatensaetze().subscribe((data:  Arbeitssuchende[]) => {
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
    const expectedHeader = 'Merkmal;Jan';
    return header.startsWith(expectedHeader);
  }

  resetEntryData(): void {
    this.entryData = new Arbeitssuchende();
  }

  onDateSelect(date : string){
    this.selectedDate = date;
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

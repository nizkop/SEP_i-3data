import {Component, ViewChild} from '@angular/core';
import {Geburten} from "../../../Model/geburten";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {Data8Service} from "../../../services/datenservices/data8.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {User} from "../../../Model/user";
import {UserService} from "../../../services/user.service";
import {BarChartComponent} from "../../diagram/barchart/bar-chart.component";
import {MatDialog} from "@angular/material/dialog";
import {Diagrammodel} from "../../../Model/Diagrammodel";
import {PieChartComponent} from "../../diagram/piechart/pie-chart.component";
import {DownloadService} from "../../../services/download.service";
import {DownloadbereichComponent} from "../../../downloadbereich/downloadbereich.component";
import {AnsichtsartPopup} from "../../../Model/ansichtsartPopup";

@Component({
  selector: 'app-usertable8',
  templateUrl: './usertable8.component.html',
  styleUrls: ['./usertable8.component.scss']
})
export class Usertable8Component {
  @ViewChild(DownloadbereichComponent) downloadbereichComponent!: DownloadbereichComponent;diagramData: Diagrammodel[]=[];
  selectedYear: number = 0;
  data: string='Geburten der Stadt Aachen nach Monat, 2015-2022';
  entries: Geburten[] = [];
  dataSource = new MatTableDataSource<any>(this.entries);
  uploadButtonDisabled = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | null=null;
  entryData: Geburten = new Geburten();
  profileuser: User = new User();
  dataFavs : string[] = [];
  displayedColumns: string[] = ['id', 'jahr','januar', 'februar', 'maerz', 'april','mai','juni', 'juli', 'august','september','oktober','november','dezember','gesamt'];
  namedColumns: string[] = ['ID', 'Jahr', 'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember', 'gesamt'];

  constructor(private data8Service: Data8Service,
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
    console.log("downloadPDF User Tab1", checkboxes);
    if(this.entries.length > 0){
      let diagramme: File[] = [];
      checkboxes["Treemap"] = false;
      if(checkboxes["Balkendiagramm"]){
        await this.openBarChart(AnsichtsartPopup.SAVE).toPromise();
        diagramme.push(await this.downloadService.tempPopup());
        this.dialog.closeAll();
      }
      if(checkboxes["Kuchendiagramm"]){
        await this.openPieChart(AnsichtsartPopup.SAVE).toPromise();
        diagramme.push( await this.downloadService.tempPopup());
        this.dialog.closeAll();
      }
      this.downloadService.downloadDatensatzPDF(this.displayedColumns, this.data, "8", diagramme, this.namedColumns);
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
  openPieChart(ansichtsart: AnsichtsartPopup = AnsichtsartPopup.STANDARD){
    let width= '1000px';
    let height= '600px';
    if(ansichtsart === AnsichtsartPopup.SAVE) {
      width = '100vh'; // da Kuchendiagramm quadratisch
      height = '100vh';
    }
    this.convertData();
    const dialogRef = this.dialog.open(PieChartComponent, {
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

  convertData(){
    let nummer=0;
    for (let i = 0; i<this.entries.length; i++){
      if (this.selectedYear==this.entries[i].jahr){
        nummer=i;
      }
    }
    this.diagramData.push({ name: 'Januar', zahl: this.entries[nummer].januar })
    this.diagramData.push({ name: 'Februar', zahl: this.entries[nummer].februar })
    this.diagramData.push({ name: 'Maerz', zahl: this.entries[nummer].maerz })
    this.diagramData.push({ name: 'April', zahl: this.entries[nummer].april })
    this.diagramData.push({ name: 'Mai', zahl: this.entries[nummer].mai })
    this.diagramData.push({ name: 'Juni', zahl: this.entries[nummer].juni })
    this.diagramData.push({ name: 'Juli', zahl: this.entries[nummer].juli })
    this.diagramData.push({ name: 'August', zahl: this.entries[nummer].august })
    this.diagramData.push({ name: 'September', zahl: this.entries[nummer].september })
    this.diagramData.push({ name: 'Oktober', zahl: this.entries[nummer].oktober })
    this.diagramData.push({ name: 'November', zahl: this.entries[nummer].november })
    this.diagramData.push({ name: 'Dezember', zahl: this.entries[nummer].dezember })
  }


  // Datenbereich:

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getEntries(): void {
    this.data8Service.getDatensaetze().subscribe((data:  Geburten[]) => {
      this.entries = data;
      this.dataSource.data = this.entries;
      if(this.entries.length > 0){
        this.downloadbereichComponent.setActive(true, false, true);
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
    const expectedHeader = 'Monat / Jahr,2015,2016,2017,2018,2019,2020,2021,2022';

    return header === expectedHeader;
  }
  resetEntryData(): void {
    this.entryData = new Geburten();
  }

  onYearSelect(year: number){
    this.selectedYear = year;
  }

  // addEntry(): void {
  //   if (!this.entryData.jahr || !this.entryData.januar || !this.entryData.februar || !this.entryData.maerz || !this.entryData.april || !this.entryData.mai || !this.entryData.juni || !this.entryData.juli || !this.entryData.august || !this.entryData.september || !this.entryData.oktober || !this.entryData.november || !this.entryData.dezember || !this.entryData.gesamt) {
  //     alert('Bitte füllen Sie alle notwendigen Felder aus.');
  //     return;
  //   }
  //   this.data8Service.createEntry(this.entryData).subscribe(() => {
  //     this.getEntries();
  //     this.resetEntryData();
  //   });
  // }

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

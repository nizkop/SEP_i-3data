import {Component, ViewChild} from '@angular/core';
import {Sterbefaelle} from "../../../Model/sterbefaelle";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {Data2Service} from "../../../services/datenservices/data2.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {User} from "../../../Model/user";
import {UserService} from "../../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {PieChartComponent} from "../../diagram/piechart/pie-chart.component";
import {BarChartComponent} from "../../diagram/barchart/bar-chart.component";
import {Diagrammodel} from "../../../Model/Diagrammodel";
import {DownloadbereichComponent} from "../../../downloadbereich/downloadbereich.component";
import {AnsichtsartPopup} from "../../../Model/ansichtsartPopup";
import {DownloadService} from "../../../services/download.service";

@Component({
  selector: 'app-usertable2',
  templateUrl: './usertable2.component.html',
  styleUrls: ['./usertable2.component.scss']
})
export class Usertable2Component {
  @ViewChild(DownloadbereichComponent) downloadbereichComponent!: DownloadbereichComponent;
  selctedyear: number = 0;
  data: string='Sterbefälle Aachen';
  diagramData: Diagrammodel[] = [];
  entries: Sterbefaelle[] = [];
  dataSource = new MatTableDataSource<any>(this.entries);
  uploadButtonDisabled = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | null=null;
  entryData: Sterbefaelle = new Sterbefaelle();
  profileuser: User = new User();
  dataFavs : string[] = [];
  displayedColumns: string[] = ['id','jahr', 'januar', 'februar', 'maerz', 'april','mai','juni', 'juli', 'august','september','oktober','november','dezember','gesamt'];
  namedColumns: string[] = ['ID', 'Jahr', 'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'Semptember', 'Oktober', 'November', 'Dezember', 'gesamt'];

  constructor(private data2Service: Data2Service,
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
    console.log("downloadPDF User Tab2", checkboxes);
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
      this.downloadService.downloadDatensatzPDF(this.displayedColumns, this.data, "2", diagramme, this.namedColumns);
    } else{
      alert("Es sind keine Daten für diesen Datensatz verfügbar, daher kann er leider nicht heruntergeladen werden. ");
      console.log("Abbruch downloadPDF: keine Daten für Download verfügbar");
    }
  }

  openPieChart(ansichtsart: AnsichtsartPopup = AnsichtsartPopup.STANDARD) {
    let width= '1000px';
    let height= '600px';
    if(ansichtsart === AnsichtsartPopup.SAVE) {
      width = '100vh'; // da Kuchendiagramm quadratisch
      height = '100vh';
    }
    this.convertSterbe();
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
  openBarChart(ansichtsart: AnsichtsartPopup = AnsichtsartPopup.STANDARD){
    let width= '1000px';
    let height= '600px';
    if(ansichtsart === AnsichtsartPopup.SAVE) {
      width = '100vw';
      height = '100vh';
    }
    this.convertSterbe();
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
  convertSterbe(){
    let nummer =0;
  for (let i = 0; i<this.entries.length; i++) {
    if (this.selctedyear==this.entries[i].jahr){
      nummer= i;
    }
  }
    this.diagramData.push({ name: 'Januar', zahl: this.entries[nummer].januar });
    this.diagramData.push({ name: 'Februar', zahl: this.entries[nummer].februar });
    this.diagramData.push({ name: 'Maerz', zahl: this.entries[nummer].maerz });
    this.diagramData.push({ name: 'April', zahl: this.entries[nummer].april });
    this.diagramData.push({ name: 'Mai', zahl: this.entries[nummer].mai });
    this.diagramData.push({ name: 'Juni', zahl: this.entries[nummer].juni });
    this.diagramData.push({ name: 'Juli', zahl: this.entries[nummer].juli });
    this.diagramData.push({ name: 'August', zahl: this.entries[nummer].august });
    this.diagramData.push({ name: 'September', zahl: this.entries[nummer].september });
    this.diagramData.push({ name: 'Oktober', zahl: this.entries[nummer].oktober });
    this.diagramData.push({ name: 'November', zahl: this.entries[nummer].november });
    this.diagramData.push({ name: 'Dezember', zahl: this.entries[nummer].dezember });
  }



  // Datenbereich:
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getEntries(): void {
    this.data2Service.getDatensaetze().subscribe((data:  Sterbefaelle[]) => {
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
    this.entryData = new Sterbefaelle();
  }

  onYearSelect(year: number) {
  this.selctedyear=year;
  }

  // Lieblingsdatensatzauswahl
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



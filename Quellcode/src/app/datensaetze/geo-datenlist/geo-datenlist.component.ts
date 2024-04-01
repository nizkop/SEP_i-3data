import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {GeoDataService} from "../../services/datenservices/geo-data.service";
import {MatSort, Sort} from "@angular/material/sort";
import {GeoDatenPunkt} from "../../Model/geoDatenPkt";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {IconArt} from "../../Model/IconArt";


@Component({
  selector: 'app-geo-datenlist',
  templateUrl: './geo-datenlist.component.html',
  styleUrls: ['./geo-datenlist.component.css']
})
export class GeoDatenlistComponent implements OnInit, AfterViewInit{
  uploadButtonDisabled = false;
  // für Tabelle:
  entryData: GeoDatenPunkt = new GeoDatenPunkt();
  entries: GeoDatenPunkt[] = [];
  dataSource = new MatTableDataSource<any>(this.entries);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | null=null;
  // Columns über den geo-Datenservice, damit einheitlich definiert

  constructor(public dataService: GeoDataService, // öffentlich, damit HTML (für Spaltenbezeichnungen) darauf zugreifen kann
              private _liveAnnouncer: LiveAnnouncer) { }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.entries);
    this.getEntries();
  }
  ngAfterViewInit(): void{ // für Interface AfterInit
    this.dataSource = new MatTableDataSource(this.entries);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getEntries(): void {
    this.dataService.getDatensaetze().subscribe((data:  GeoDatenPunkt[]) => {
      this.entries = data;
      this.dataSource.data = this.entries;
      this.initListe(); // muss darauf warten, dass Daten geladen wurden
    });
  }


  // ======== Daten-Upload und Info:  ========

  async uploadFile(event: Event): Promise<void> {
    event.preventDefault();

    const fileInput = (event.target as HTMLFormElement).elements.namedItem('file') as HTMLInputElement;
    // @ts-ignore
    const file = fileInput.files[0];

    if (!file) {
      alert('Bitte wählen Sie eine Datei aus.');
      return;
    }
    if (file.name.indexOf(".json") <= -1){
      alert("Fehler: Die Datei, die Sie versuchen, hochzuladen, ist kein JSON-Datei.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    //Upload Cooldown
    this.uploadButtonDisabled = true;
    const cooldownTime = 5000; //5 seconds
    setTimeout(() => {
      this.uploadButtonDisabled = false;
    }, cooldownTime);

    try {
      const response = await this.dataService.uploadFile(file).toPromise();
      alert('Die Geo-Datei wurde erfolgreich hochgeladen.');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Fehler beim Dateihochladen. Bitte kontrollieren Sie, ob Sie eine passend formatierte GeoJSON-Datei hochladen und versuchen Sie es erneut.');
    }
    window.location.reload();
    // this.initListe();
  }


  vorhandeneDaten(): string[] {
    const vorhanden: string[] = [];
    for (const art in IconArt) {
      try{
        const artEnum = IconArt[art as keyof typeof IconArt]; // Wert zurück ins IconArt-Enum konvertieren
        if (this.dataService.filterNachArt([artEnum], this.entries).length > 0) {
          // Unterscheidung, was geschrieben werden soll:
          if(artEnum == IconArt.rest){
            vorhanden.push("weitere Daten, die keiner bekannten Kategorie angehören");
          } else{
            vorhanden.push(artEnum);
          }

        }
      } catch (error){
        console.log("Fehler:" , error);
      }
    }
    return vorhanden;
  }


  // ======== Tabelle:  ========

  initListe():void{
    console.log("initListe");
    const datenListeElement = document.getElementById("datenListe");
    if (datenListeElement) {
      const datenListe = this.vorhandeneDaten();
      datenListe.forEach((data) => {
        const liElement = document.createElement("li");
        liElement.innerText = data;
        datenListeElement.appendChild(liElement);
      });
    }
  }
  getColumnLabel(column: string): string {
    const index = this.dataService.displayedColumns.indexOf(column);
    if (index !== -1) {
      return this.dataService.displayedColumnLabels[index];
    }
    return 'X';
  }

  announceSortChange($event: Sort) {
  }


}

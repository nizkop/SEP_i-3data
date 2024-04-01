import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {Privathaushalte} from "../../../Model/privathaushalte";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {Data6Service} from "../../../services/datenservices/data6.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
@Component({
  selector: 'app-tableview6',
  templateUrl: './tableview6.component.html',
  styleUrls: ['./tableview6.component.css']
})
export class Tableview6Component implements OnInit, AfterViewInit{
  entries: Privathaushalte[] = [];
  dataSource = new MatTableDataSource<any>(this.entries);
  uploadButtonDisabled = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | null=null;
  entryData: Privathaushalte = new Privathaushalte();
  displayedColumns: string[] = ['id','jahr','state', 'bezirk', 'city', 'anzahl'];
  constructor(private data6Service: Data6Service,
              private _liveAnnouncer: LiveAnnouncer) { }
  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.entries)
    this.getEntries();
  }
  ngAfterViewInit(): void{
    this.dataSource = new MatTableDataSource(this.entries);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getEntries(): void {
    this.data6Service.getDatensaetze().subscribe((data:  Privathaushalte[]) => {
      this.entries = data;
      this.dataSource.data = this.entries;
    });
  }

  addEntry(): void {
    if (!this.entryData.jahr || !this.entryData.state || !this.entryData.bezirk || !this.entryData.city || !this.entryData.anzahl) {
      alert('Bitte füllen Sie alle notwendigen Felder aus.');
      return;
    }
    this.data6Service.createEntry(this.entryData).subscribe(() => {
      this.getEntries();
      this.resetEntryData();
    });
  }
  async isXMLValid(file: File): Promise<boolean> {
    const content = await file.text();
    const lines = content.split('\n');
    const firstLine = lines[0].trim();
    const expectedHeader = '<?xml version="1.0" encoding="UTF-8"?><genml:GENESIS xmlns:genml="https://www-genesis.destatis.de/xml/GENESIS-ML_V0_3" NAME="12211-201i"><genml:DISPLAY-DATA><genml:LABELS><genml:LABEL NAME="12211-201iFOOTNOTE" POSITION="" VISIBILITY="true"><genml:CAPTION><genml:TEXT LANG="de" FORMAT="text/plain">Ergebnisse des Mikrozensus';

    return firstLine.startsWith(expectedHeader);
  }

  async uploadFile(event: Event): Promise<void> {
    event.preventDefault();

    const fileInput = (event.target as HTMLFormElement).elements.namedItem('file') as HTMLInputElement;
    // @ts-ignore
    const file = fileInput.files[0];

    if (!file) {
      alert('Bitte wählen Sie eine Datei zum hochladen.');
      return;
    }

    if (!(await this.isXMLValid(file))) {
      alert('Ungültiges CSV-Format. Bitte laden Sie eine CSV-Datei mit den korrekten Spaltennamen hoch.');
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
      const response = await this.data6Service.uploadFile(file).toPromise();
      alert('Datei erfolgreich hochgeladen.');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Fehler beim Datei hochladne. Bitte versuchen Sie es später erneut.');
    }
    window.location.reload();
  }

  updateEntry(): void {
    if (this.entryData.id) {
      if (!this.entryData.jahr || !this.entryData.state || !this.entryData.bezirk || !this.entryData.city || !this.entryData.anzahl) {
        alert('Bitte füllen Sie alle notwendigen Felder aus.');
        return;
      }
      this.data6Service.updateEntry(this.entryData.id, this.entryData).subscribe(() => {
        this.getEntries();
        this.resetEntryData();
      });
    } else {
      alert('Bitte geben Sie einen Eintrag für die ID ein.');
    }
  }

  deleteEntry(): void {
    if (this.entryData.id) {
      this.data6Service.deleteEntry(this.entryData.id).subscribe(() => {
        this.getEntries();
        this.resetEntryData();
      });
    } else {
      alert('Bitte geben Sie einen Eintrag für die ID ein.');
    }
  }

  resetEntryData(): void {
    this.entryData = new Privathaushalte();
  }
}

import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {Strassenliste} from "../../../Model/strassenliste";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {Data7Service} from "../../../services/datenservices/data7.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
@Component({
  selector: 'app-tableview7',
  templateUrl: './tableview7.component.html',
  styleUrls: ['./tableview7.component.css']
})
export class Tableview7Component implements OnInit, AfterViewInit{
  entries: Strassenliste[] = [];
  dataSource = new MatTableDataSource<any>(this.entries);
  uploadButtonDisabled = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | null=null;
  entryData: Strassenliste = new Strassenliste();
  displayedColumns: string[] = ['id','fid','gemeindeschluessel', 'strassenschluessel', 'strasse'];
  constructor(private data7Service: Data7Service,
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
    this.data7Service.getDatensaetze().subscribe((data:  Strassenliste[]) => {
      this.entries = data;
      this.dataSource.data = this.entries;
    });
  }

  addEntry(): void {
    if (!this.entryData.fid || !this.entryData.strassenschluessel || !this.entryData.gemeindeschluessel || !this.entryData.strasse) {
      alert('Bitte füllen Sie alle notwendigen Felder aus.');
      return;
    }
    this.data7Service.createEntry(this.entryData).subscribe(() => {
      this.getEntries();
      this.resetEntryData();
    });
  }
  async isCSVValid(file: File): Promise<boolean> {
    const content = await file.text();
    const lines = content.split('\n');
    const header = lines[0].trim();
    const expectedHeader = 'FID,gemeindeschluessel,strassenschluessel,strasse';

    return header === expectedHeader;
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

    if (!(await this.isCSVValid(file))) {
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
      const response = await this.data7Service.uploadFile(file).toPromise();
      alert('Datei erfolgreich hochgeladen.');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Fehler beim Datei hochladne. Bitte versuchen Sie es später erneut.');
    }
    window.location.reload();
  }

  updateEntry(): void {
    if (this.entryData.id) {
      if (!this.entryData.fid || !this.entryData.strassenschluessel || !this.entryData.gemeindeschluessel || !this.entryData.strasse) {
        alert('Bitte füllen Sie alle notwendigen Felder aus.');
        return;
      }
      this.data7Service.updateEntry(this.entryData.id, this.entryData).subscribe(() => {
        this.getEntries();
        this.resetEntryData();
      });
    } else {
      alert('Bitte geben Sie einen Eintrag für die ID ein.');
    }
  }

  deleteEntry(): void {
    if (this.entryData.id) {
      this.data7Service.deleteEntry(this.entryData.id).subscribe(() => {
        this.getEntries();
        this.resetEntryData();
      });
    } else {
      alert('Bitte geben Sie einen Eintrag für die ID ein.');
    }
  }

  resetEntryData(): void {
    this.entryData = new Strassenliste();
  }
}

import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { Geburten } from '../../../Model/geburten';
import { Data8Service } from '../../../services/datenservices/data8.service';
import {MatTableDataSource} from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-tableview8',
  templateUrl: './tableview8.component.html',
  styleUrls: ['./tableview8.component.css']
})
export class Tableview8Component implements OnInit, AfterViewInit{
  entries: Geburten[] = [];
  dataSource = new MatTableDataSource<any>(this.entries);
  uploadButtonDisabled = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | null=null;
  entryData: Geburten = new Geburten();
  displayedColumns: string[] = ['id', 'jahr','januar', 'februar', 'maerz', 'april','mai','juni', 'juli', 'august','september','oktober','november','dezember','gesamt'];
  constructor(private data8Service: Data8Service,
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
    this.data8Service.getDatensaetze().subscribe((data:  Geburten[]) => {
      this.entries = data;
      this.dataSource.data = this.entries;
    });
  }

  addEntry(): void {
    if (!this.entryData.jahr || !this.entryData.januar || !this.entryData.februar || !this.entryData.maerz || !this.entryData.april || !this.entryData.mai || !this.entryData.juni || !this.entryData.juli || !this.entryData.august || !this.entryData.september || !this.entryData.oktober || !this.entryData.november || !this.entryData.dezember || !this.entryData.gesamt) {
      alert('Bitte füllen Sie alle notwendigen Felder aus.');
      return;
    }
    this.data8Service.createEntry(this.entryData).subscribe(() => {
      this.getEntries();
      this.resetEntryData();
    });
  }
  async isCSVValid(file: File): Promise<boolean> {
    const content = await file.text();
    const lines = content.split('\n');
    const header = lines[0].trim();
    const expectedHeader = 'Monat / Jahr,2015,2016,2017,2018,2019,2020,2021,2022';

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
      const response = await this.data8Service.uploadFile(file).toPromise();
      alert('Datei erfolgreich hochgeladen.');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Fehler beim Datei hochladne. Bitte versuchen Sie es später erneut.');
    }
    window.location.reload();
  }

  updateEntry(): void {
    if (this.entryData.id) {
      if (!this.entryData.jahr || !this.entryData.januar || !this.entryData.februar || !this.entryData.maerz || !this.entryData.april || !this.entryData.mai || !this.entryData.juni || !this.entryData.juli || !this.entryData.august || !this.entryData.september || !this.entryData.oktober || !this.entryData.november || !this.entryData.dezember || !this.entryData.gesamt) {
        alert('Bitte füllen Sie alle notwendigen Felder aus.');
        return;
      }
      this.data8Service.updateEntry(this.entryData.id, this.entryData).subscribe(() => {
        this.getEntries();
        this.resetEntryData();
      });
    } else {
      alert('Bitte geben Sie einen Eintrag für die ID ein.');
    }
  }

  deleteEntry(): void {
    if (this.entryData.id) {
      this.data8Service.deleteEntry(this.entryData.id).subscribe(() => {
        this.getEntries();
        this.resetEntryData();
      });
    } else {
      alert('Bitte geben Sie einen Eintrag für die ID ein.');
    }
  }

  resetEntryData(): void {
    this.entryData = new Geburten();
  }
}

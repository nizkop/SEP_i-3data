import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GeoDatenPunkt} from "../../Model/geoDatenPkt";
import {IconArt} from "../../Model/IconArt";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../Model/user";
import {UserService} from "../user.service";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class GeoDataService {
  private apiUrl = 'http://localhost:8080/geo';
  displayedColumnLabels: string[] = ['ID', 'JSON-Geometrie', 'Längengrad', 'Breitengrad', 'Art', 'Koordinatensystem', 'Ortsbeschreibung', 'Bildpfad']; // ordentliche Spaltennamen
  displayedColumns: string[] = ['id', 'geometry','laengengrad', 'breitengrad', 'art', 'koordinatensystem','ortsbeschreibung', 'icon']; //Bezeichnungen zum Suchen der Attribute
  private user: User|null = null; // nur für Download


  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  getDatensaetze(): Observable<GeoDatenPunkt[]> {
    return this.http.get<GeoDatenPunkt[]>(this.apiUrl);
  }

  uploadFile(file: File): Observable<string> {
    // console.log("uploadFile()")
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload`, formData, {responseType: 'text'});
  }

  // ======== Herausfiltern, welche Arten von GeoDatenPunkten vorhanden sind:  ========
  filterNachArt(relevanteArten: IconArt[], geoData: GeoDatenPunkt[]): GeoDatenPunkt[] { // ! wird sehr oft ausgeführt
    let relevant: GeoDatenPunkt[] = [];
    for (const art of relevanteArten) {
      if(art == IconArt.rest){
        relevant = relevant.concat(geoData.filter(data =>
          (! data.art.toLowerCase().includes(IconArt.knotenpunkt.toLowerCase()))  &&
          (! data.art.toLowerCase().includes(IconArt.schutzhuette.toLowerCase())) &&
          (! data.art.toLowerCase().includes(IconArt.rettungspunkt.toLowerCase()))
        ));
      } else{
        relevant = relevant.concat(geoData.filter(data => data.art.toLowerCase().includes(art.toLowerCase())));
      }
    }
    return relevant;
  }


  // ======== Download der Geodaten:  ========

  downloadPDF(): void {
    // Daten abrufen:
    let data2: MatTableDataSource<any>;
    this.getDatensaetze().subscribe(data => {
      data2 = new MatTableDataSource<any>(data);
      if (data2 && data2.data.length === 0) {
        alert("Noch sind keine Daten zum Download verfügbar.");
        return;
      }
      // PDF erstellen:
      const doc = new jsPDF();
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('json Geodaten Aachener Wald', 10, 10);

      // Daten als Tabelle einfügen:
      const tableData = data2.filteredData.map(
        entry => [entry.id, entry.geometry, entry.laengengrad, entry.breitengrad, entry.art, entry.koordinatensystem, entry.ortsbeschreibung, entry.icon]
      );
      // AutoTable-Plugin hinzufügen:
      (<any>doc).autoTable({ head: [this.displayedColumns], body: tableData });

      this.formatPDF(doc);
      doc.save('table.pdf');
    });
  }
  formatPDF(doc: jsPDF): void {
    // Seitenzahlen aktualisieren
    const totalPages = doc.internal.pages.length;
    for (let i = 1; i <= totalPages; i++) {
      // Seiteninhalt zeichnen
      const pageSize = doc.internal.pageSize;
      const pageWidth = pageSize.width;
      const pageHeight = pageSize.height;

      // Stempel hinzufügen
      const currentDate = new Date();
      const fontSize = 10; // Schriftgröße des Stempels
      const margin = 10; // Randabstand
      const formattedDate = currentDate.toLocaleDateString();

      let stampText = `@ILOVEDATA\tHeruntergeladen am ${formattedDate}`;
      if (
          this.user != null &&
          this.user.firstName &&
          this.user.firstName.length > 0 &&
          this.user.lastName &&
          this.user.lastName.length > 0
        ) {
          stampText += " von " + this.user.firstName + " " + this.user.lastName;
        }

      const stampWidth = doc.getStringUnitWidth(stampText) * fontSize * 0.35;
      const stampHeight = fontSize;
      const stampX = margin/2; // X-Koordinate des Stempels
      const stampY = (pageHeight - stampWidth) / 2;// Y-Koordinate des Stempels
      doc.setFontSize(fontSize);
      doc.text(stampText, stampX, stampY, { angle: -90 });

      doc.setPage(i);
      doc.text(`${i} / ${totalPages}`, doc.internal.pageSize.getWidth() - margin, margin, { align: 'right' });
    }
  }

}

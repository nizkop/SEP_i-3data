import { Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {User} from "../Model/user";
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from "html2canvas";


@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private user: User|null = null;
  private apiUrl = 'http://localhost:8080/Datensaetze/table';
  margin: number = 10;
  topmargin: number = 10;
  yposition: number= 0;
  doc = new jsPDF();
  id: number=0;


  constructor(private http: HttpClient,
              private userService: UserService
             ) {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
    this.yposition = this.topmargin;
  }


  /**
   * Verbindung zum Backend, um die Daten abzurufen
   * @param id ID des Datensatzes, die genutzt wird, um den Endpoint zu bestimmen
   * @return aufgelistete Datenobjekte dieses Datensatzes
   */
  getDatensaetze(id: number): Observable<any[]> {
    let id_str = String(id);
    return this.http.get<any[]>(this.apiUrl + id_str);
  }




  // ----- Pdf-Basis und Datentabelle:  ------------------------------------


  /**
   * Anlegen einer neuen PDF-Datei, die danach für den Download zur Verfügung steht
   * Es werden grundlegende Eigenschaften der PDF festgelegt und Daten vorheriger Download zurückgesetzt.
   * @param title Titel, der als Überschrift _in_ der PDF erscheinen soll
   */
  createPDF(title: string){
    // PDF erstellen:
    this.doc = new jsPDF(); // damit mehrfach nutzbarer Download
    this.yposition = 0;
    this.setyPosition(this.margin);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(16);
    this.doc.text(title, this.margin, this.yposition);
    this.setyPosition(this.margin);
    return;
  }


  /**
   * Verfolgung der y-Koordinate des Inhaltendes in der PDF auf der letzten Seite
   * wird genutzt, um die Höhen neuen Inputs in der PDF korrekt festzusetzen
   * wird genutzt, um die Verschiebung der aktuellen Position bei Einfügen von Text und Bildern nachzuvollziehen (! nicht bei der Tabelle)
   * @param zusatz Höhe neu eingefügten Inhaltes = Verschiebung der aktuellen Position um diese Zahl nach unten
   */
  setyPosition(zusatz: number){
    this.yposition += zusatz;
    if(this.yposition >= this.doc.internal.pageSize.height){
      this.yposition -= this.doc.internal.pageSize.height;
    }
  }

  /**
   * Download-Funktion des Datensatzes, die die Teilschritte des Downloads bündelt
   * @param displayedColumns Attributnamen der Daten-Objekte
   * @param title Titel, der dem PDF-Dateinamen hinzugefügt wird, um die PDF-Datei nach dem Download gut zuordnenbar zu machen
   * @param id ID des Datensatzes
   * @param result$ Liste von zwischengespeicherten Diagrammbildern, die der PDF zugefügt werden
   * @param namedColumns Überschriften der Tabellenspalten
   */
  async downloadDatensatzPDF(displayedColumns: string[], title: string, id: string, result$: File[], namedColumns: string[]=[]): Promise<void> {
    this.createPDF(title);
    for(const dia of result$){
      await this.addPicToPdf(dia);
    }
    await this.datentabelleEinfuegen(displayedColumns, id, namedColumns);
    this.formatPDF();
    this.doc.save('Tabelle'+id+'-'+title.replace(" ", "")+'.pdf');
  }

  /**
   * Einfügen der Daten dieses Datensatzes als Tabelle in die PDF
   * @param displayedColumns Attributnamen der Daten-Objekte
   * @param id ID des Datensatzes
   * @param namedColumns Überschriften der Tabellenspalten
   */
  async datentabelleEinfuegen(displayedColumns: string[], id: string, namedColumns: string[]=[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let data2: MatTableDataSource<any>;
      this.getDatensaetze(Number(id)).subscribe(data => {
        data2 = new MatTableDataSource<any>(data);
        if (data2 && data2.data.length === 0) {
          alert("Noch sind keine Daten zum Download verfügbar.");
          reject("No data available.");
          return;
        }

        // Daten als Tabelle einfügen:
        const tableData = data2.filteredData.map(entry => {
          const attributes = Object.keys(entry); // Attribute des entspr. Objekttypen finden
          return attributes.map(attribute => entry[attribute]);
        });

        // AutoTable-Plugin hinzufügen:
        if(namedColumns && namedColumns.length > 0){ // wenn Spaltennamen extra angegeben (s. Table 4)
          (<any>this.doc).autoTable({startY: this.yposition, head: [namedColumns], body: tableData  });
        }else{
          (<any>this.doc).autoTable({startY: this.yposition, head: [displayedColumns], body: tableData });
        }

        resolve();
      }, error => {
        reject(error); // Fehler an aufrufende Stelle weitergeleitet
      });
    }).catch(error => {
      console.error("Fehler datentabelleEinfügen:", error);
    });
  }

  /**
   * PDF-Datei wird formatiert = im Anschluss aufzurufen:
   * Es werden Seitenzahlen und ein Stempel zu jeder Seite hinzugefügt.
   * Der Stempel enthält das Downlaod-Datum, sowie den Namen des Nutzers, der den Datensatz herunterlädt.
   */
  formatPDF(): void {
    // Seitenzahlen aktualisieren
    let totalPages = this.doc.internal.pages.length;
    if(totalPages> 0){ // <- letzte Seite wird sonst doppelt beschriftet & Gesamtseitenzahl ist 1 zu hoch
      totalPages-= 1;
    }
    for (let i = 1; i <= totalPages; i++) {
      // Seiteninhalt zeichnen
      const pageSize = this.doc.internal.pageSize;
      const pageWidth = pageSize.width;
      const pageHeight = pageSize.height;

      // Stempel hinzufügen
      const currentDate = new Date();
      const fontSize = 10; // Schriftgröße des Stempels
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

      const stampWidth = this.doc.getStringUnitWidth(stampText) * fontSize * 0.35;
      const stampHeight = fontSize;
      const stampX = this.margin/2; // X-Koordinate des Stempels (! darauf wird getestet)
      const stampY = (pageHeight - stampWidth) / 2;// Y-Koordinate des Stempels
      this.doc.setFontSize(fontSize);
      this.doc.text(stampText, stampX, stampY, { angle: -90 });
      this.doc.setPage(i);
      this.doc.text(`${i} / ${totalPages}`, this.doc.internal.pageSize.getWidth() - this.margin, this.margin, { align: 'right' });
    }
  }



  // ----- Bild-Optionen:   ----------------------------------


  /**
   * Zwischenspeichern der Diagramme, die als Popup auf der Komponente geöffnet werden;
   * grauer Hintergrund/Randbereich (nicht durchs Popup ausgefüllter Bildschirmbereich) wird herausgelöscht
   * @return File-Objekt der Bilddatei
   */
  async tempPopup(): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      const dialogContainer = document.querySelector('.cdk-overlay-container') as HTMLElement;

      html2canvas(dialogContainer).then((canvas: HTMLCanvasElement) => {
        const context = canvas.getContext('2d');
        if (!context) {
          reject(new Error('Failed to create 2D context for the canvas.'));
          return;
        }

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        const newCanvas = document.createElement('canvas');
        const newContext = newCanvas.getContext('2d');
        if (!newContext) {
          reject(new Error('Failed to create 2D context for the new canvas.'));
          return;
        }
        newCanvas.width = canvas.width;
        newCanvas.height = canvas.height;

        const transparentColor = [173, 173, 173, 255];

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          if (r !== transparentColor[0] || g !== transparentColor[1] || b !== transparentColor[2] || a !== transparentColor[3]) {
            data[i + 3] = 255; // alpha channel auf 255 (opaque)

            // Copy pixel to new canvas
            const x = (i / 4) % canvas.width;
            const y = Math.floor((i / 4) / canvas.width);
            newContext.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
            newContext.fillRect(x, y, 1, 1);
          }
        }

        newCanvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "popup_screenshotX.png", { type: 'image/png' });
            resolve(file);
          } else {
            reject(new Error('Failed to create Blob from the canvas.'));
          }
        }, 'image/png');
      }).catch(error => {
        reject(error);
      });
    });
  }

  /**
   * Bilddatei zur PDF hinzufügen:
   * Die Bildgröße wird auf die maximal mögl. Größe in der PDF angepasst, die durch die Breite der PDF gegeben ist.
   * @param bild als Bilddatei gespeichertes Diagramm-Popup
   */
  addPicToPdf(bild: File){
      return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageData = event.target?.result as string | null;
          if (imageData) {
            const base64Image = imageData.split(',')[1]; // base64-encoded image Daten extrahieren

            const img = new Image(); // um Größe bzw. Höhen-zu-Breiten-Verhältnis des Bildes zu erfassen
            img.src = imageData;
            img.onload = () => {
              const imgWidth = this.doc.internal.pageSize.getWidth() - 2 * this.margin; // gegeben durch PDF-Datei
              const imgHeight = imgWidth / (img.width / img.height); // <- Anpassung der Höhe an der vorgegebenen Breite

              this.doc.addImage(base64Image, 'JPEG', this.margin, this.yposition, imgWidth, imgHeight);
              this.setyPosition(imgHeight+this.margin);
              resolve();
            }
          } else {
            alert("Fehler beim Lesen der Bild-Daten.")
          }
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(bild);
      });
    }

  /**
   * Hilfsmethode (Entwicklung) = lädt Popup als Bild herunter
   */
  savePopup(){ // Hilfsmethode
    const dialogContainer = document.querySelector('.cdk-overlay-container') as HTMLElement;
    html2canvas(dialogContainer).then((canvas: HTMLCanvasElement) => {
          const image = canvas.toDataURL();
          const link = document.createElement('a');
          link.href = image;
          link.download = 'popup_screenshot.png';
          link.click();
          console.log("download erreicht");
    });
  }






}

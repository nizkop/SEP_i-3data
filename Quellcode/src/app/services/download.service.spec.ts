import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DownloadService } from './download.service';
import { UserService } from './user.service';
import { testuser } from '../Model/test/test-user';
import jsPDF from 'jspdf';
import 'jspdf-autotable';



describe('DownloadService', () => {
  let service: DownloadService;
  let httpMock: HttpTestingController;
  const mockData = [
    { name: "Sophie", zahl: 34 },
    { name: "Marie", zahl: 33 },
    { name: "Mia", zahl: 26 },
    { name: "Noah", zahl: 26 }
  ];
  const displayedColumns = ["id", "anzahl", "vorname", "geschlecht", "position"];
  const id = "1";



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
          // Mocking the UserService
          {provide: UserService,
            useValue: {
              getCurrentUser: () => of(testuser),
            },
          },
      ],
    }).compileComponents();
    service = TestBed.inject(DownloadService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  async function createDummyImageFile(): Promise<File> {
    // Mocking dialogContainer element:
    const dialogContainer = document.createElement('div');
    dialogContainer.classList.add('cdk-overlay-container');
    document.body.appendChild(dialogContainer);
    dialogContainer.style.height = '2px'; //damit Popup nicht nicht-existierend
    const file = await service.tempPopup();
    document.body.removeChild(dialogContainer);
    return file;
  }



  // ----- Testfälle:  --------------------------------------------------

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('Testen von createPDF = neues PDF-Datei-Objekt im Service anlegen und y-Postion auf Seitenrand setzen', () => {
    const title = 'Testtitel BlaBla';
    service.createPDF(title);

    expect(service.doc).toBeTruthy();
    expect(service.yposition).toBe(service.topmargin + 10);

    const info = <any> service.doc.internal;
    expect(info.getFontSize()).toBe(16);
    expect(info.getFont().fontName).toBe('helvetica');
    expect(info.getFont().fontStyle).toBe('bold');
    const pageCount = info.getNumberOfPages();
    expect(pageCount).toBeGreaterThan(0);
    // Überprüfen des Titels:
    let inhalt = String(service.doc.internal.pages[1]);
    expect(inhalt).toContain(title);
  });


  it('sollte Daten als Tabelle in PDF einfuegen', (done: DoneFn) => {
    service.datentabelleEinfuegen(displayedColumns, id).then(() => {
      let inhalt = String(service.doc.internal.pages[1]);
      expect(service.doc.internal.pages.length).toBeGreaterThan(0); // ist aber eigentlich auch schon zu Beginn der Fall
      expect(inhalt).toContain(mockData[0]["name"]);
      expect(inhalt).toContain(String(mockData[0]["zahl"])); // ziemlich unspezifische Abfrage, aber der VOllständigkeit halber mit einbezogen
       for (const column of displayedColumns) {
        expect(inhalt).toContain(column);
      }
      done();
    }).catch((error) => {
      fail(error);
      done();
    });
    const req = httpMock.expectOne('http://localhost:8080/Datensaetze/table1');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });




  it('Bild zur PDF ergänzen', async () => {
    service.doc = new jsPDF();
    const startY = service.yposition;
    const startInhalt = String(service.doc.internal.pages[1]); // <- arbeiten hier auf 1. Seite
    const bild = await createDummyImageFile();

    await service.addPicToPdf(bild);

    // Kontrolle per Änderung in Dateiinhalt und tieferer y-Position:
    expect(String(service.doc.internal.pages[1])).not.toEqual(startInhalt);
    expect(service.yposition).toBeGreaterThan(startY);
  });




  it('PDF-Formatieren: Seitenzahlen und Stempel hinzufügen je Seite', () => {
    service.doc = new jsPDF();
    const startSeitenAnzahl = service.doc.internal.pages.length;
    // Seiten hinzufügen:
    const expectedTotalPages = 2;
    service.doc.addPage();
    service.doc.addPage();

    const expectedStampIntro = 'ILOVEDATA';
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const expectedStampDate = `Heruntergeladen am ${formattedDate}`;
    const expectedStampUser = " von " + testuser.firstName + " " + testuser.lastName;
    const expectedStampX = service.margin / 2;

    // zu testende Funktion:
    service.formatPDF();

    // Kontrolle:
    expect(service.doc.internal.pages.length).toEqual(startSeitenAnzahl+ expectedTotalPages);
    for (let i = 1; i <= expectedTotalPages; i++) { // <- nur Durchgehen der wirklichen Pages, nicht der 2 default (wäre undefined)
      const pageContent = String(service.doc.internal.pages[i]);
      expect(pageContent).toContain(`${i} / ${startSeitenAnzahl+ expectedTotalPages-1}`);
      expect(pageContent.includes(expectedStampIntro)).toBeTruthy();
      expect(pageContent.includes(expectedStampDate)).toBeTruthy();
      expect(pageContent.includes(expectedStampUser)).toBeTruthy();
      expect(pageContent).toContain(expectedStampX.toString());
    }
  });



});

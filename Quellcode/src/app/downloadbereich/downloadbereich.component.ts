import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-downloadbereich',
  templateUrl: './downloadbereich.component.html',
  styleUrls: ['./downloadbereich.component.css']
})
export class DownloadbereichComponent {

  @Output() downloadClicked: EventEmitter<{ [key: string]: boolean } > = new EventEmitter<{ [key: string]: boolean } >();


  checkboxes: { [key: string]: boolean } = {
    'Balkendiagramm': true,
    'Treemap': true,
    'Kuchendiagramm': true
  };
  // mögliche Diagrammarten:
  balkendiagramm=false;
  treemap = false;
  kuchendiagramm = false;
  // allg. Downloadbereich:
  downloadActive = false;


  constructor( ) {
  }


  /**
   * weiterleiten zur entspr. downloadPDF-Funktion der importierenden Komponente
   * @param {dict} checkboxes - Auswahl der Checkboxen, ob oder welche Diagramme in die PDF eingefügt werden sollen
   */
  onDownloadClick() {
    this.downloadClicked.emit(this.checkboxes); //
  }


    /**
     * Aktivierung des Downloadbereiches: Downloadbutton wird anklickbar
     * und mögliche Diagrammarten werden mit Checkboxen in den Diagrammdoadbereich eingefügt
     * = Angabe, welche Diagramme in der dies nutzenden Komponente überhaupt verfügbar sind
     * @param {boolean} balkendiagramm - ob die Balkendiagramm-Funktion für diesen Datensatz verfügbar ist
     * @param {boolean} treemap - ob die Baumkarten-Funktion für diesen Datensatz verfügbar ist
     * @param {boolean} kuchendiagramm - ob die Kuchendiagramm-Funktion für diesen Datensatz verfügbar ist
     */
  setActive(balkendiagramm= false, treemap = false, kuchendiagramm=false){
    console.log("Aktivierung");
    this.balkendiagramm = balkendiagramm;
    this.treemap = treemap;
    this.kuchendiagramm = kuchendiagramm;
    this.downloadActive = true;
  }



}

import {Component, OnInit} from '@angular/core';
import {GeoDataService} from "../services/geo-data.service";
import {GeoDatenPunkt} from "../Model/geoDatenPkt";
import {IconArt} from "../Model/IconArt";
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  //Karte:
  map: any;
  markers: L.Marker[] = [];
  // Daten:
  geoData: GeoDatenPunkt[] = []; // Array der Geo-Daten
  protected readonly IconArt = IconArt; //damit html IconArt kennt
  // Anzeige:
  displayGeoData: boolean = false; // Variable zum Anzeigen/Ausblenden der Geo-Daten (allg.)
  displaySchutzhuetten: boolean = false;
  displayRettungspunkte: boolean = false;
  displayKnotenpunkte: boolean = false;
  aktiviert: IconArt[] = []; // Möglichkeiten: ["Schutzhütte", "Rettungspunkt", "Knotenpunkt"];


  constructor(
    public dataService: GeoDataService
  ) {}


  // ======== allg. Seite:  ========

  ngOnInit(): void {
    this.initMap();
    this.loadGeoJSONData();
  }

  initMap(): void {
    this.map = L.map('map').setView([50.775346, 6.083887], 12); // Set initial map center and zoom level

    // Add your desired tile layer (e.g., OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(this.map);
  }

  loadGeoJSONData(): void {
    this.dataService.getDatensaetze().subscribe((data: GeoDatenPunkt[]) => {
      this.geoData = data;
    });
  }



  // ======== Funktionen fürs Aktualisieren der Marker:  ========

  neuerMarker(data: GeoDatenPunkt): void{
    if (data.breitengrad == null || data.laengengrad == null){
      return;
    }
    // neuen Marker setzen:
    let marker = L.marker([0,0]); // wird eh ersetzt
    // Bild finden:
    try{
      const customIcon = L.icon({
        iconUrl: data.icon,
        iconSize: [32, 32], // (Breite, Höhe) des Icons
        iconAnchor: [16, 16], // Position des Ankers des Icons (relativ zur Icon-Größe)
        shadowUrl: "" // Set the shadowUrl to an empty string
      });
      marker = L.marker([data.breitengrad, data.laengengrad], { icon: customIcon }).addTo(this.map);
    } catch(error){
      console.log("sollte nicht vorkommen, aber unbekanntes/... Bild hier abgefangen durch default-Bild von Leaflet");
      marker = L.marker([data.breitengrad, data.laengengrad]).addTo(this.map);
    }

    //Info anzeigen:
    if(data.ortsbeschreibung.length > 0){
      marker.on('mouseover', (event: L.LeafletMouseEvent) => {
        marker.bindPopup(data.ortsbeschreibung).openPopup().setLatLng(marker.getLatLng());
        // marker.getPopup().options.offset = L.point(0, 32);
      });
    }
    this.markers.push(marker);
  }

  anzeige(aktivierteArt: IconArt|null=null){
    this.deaktivieren();
    // ggf. Icon hinzufügen:
    if (aktivierteArt!= null && !this.aktiviert.includes(aktivierteArt)) {
      this.aktiviert.push(aktivierteArt);
    }
    // aktivierte Icons heraussuchen:
    const schutzhuettenData = this.dataService.filterNachArt(this.aktiviert, this.geoData);
    schutzhuettenData.forEach((data: GeoDatenPunkt) => {
      this.neuerMarker(data);
    });
    // Update der Karte:
    let markerBounds = L.featureGroup(this.markers).getBounds();
    this.map.fitBounds(markerBounds);
  }

  deaktivieren(): void{  // Entferne alle Geo-Daten von der Karte
    this.markers = [];
    this.map.eachLayer((layer: L.Layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });
  }


  // ======== alle Datenpunkte gemeinsam:  ========
  toggleGeoDataDisplayAlle(): void {
    if (this.geoData && this.geoData.length > 0 ) {
      this.displayGeoData = !this.displayGeoData;
      if (this.displayGeoData) {
        this.displaySchutzhuetten= true; // kann nicht einfach umgekehrt werden, da ja ggf. schon aktiviert, wenn alle aktiviert werden
        this.displayKnotenpunkte =true;
        this.displayRettungspunkte=true;
        this.aktiviert = [IconArt.knotenpunkt, IconArt.schutzhuette, IconArt.rettungspunkt, IconArt.rest];
        this.anzeige();
      } else {
        this.displaySchutzhuetten=false;// kann nicht einfach umgekehrt werden, da ja ggf. schon deaktiviert, wenn alle deaktiviert werden
        this.displayKnotenpunkte = false;
        this.displayRettungspunkte=false;
        this.aktiviert = [];
        this.deaktivieren();
      }
    }
  }


  // ======== einzelne Arten Datenpunkte:  ========
  toggleDisplay(icon: IconArt, attribute: keyof MapComponent, value: boolean): void {
    if (this.dataService.filterNachArt([icon], this.geoData).length > 0) {
      this[attribute] = value; // Wert entsprechendes Attributs ändern
      if (this[attribute]) {
        this.anzeige(icon);
      } else {
        const index = this.aktiviert.indexOf(icon);
        if (index !== -1) {
          this.aktiviert.splice(index, 1);
        }
        this.anzeige();
      }
    }
  }


  toggleRettungspunkteDisplay() {
    this.toggleDisplay(IconArt.rettungspunkt,
      'displayRettungspunkte', // für variablen Zugriff aufs Attribut
      !this.displayRettungspunkte // Wert umkehren für Buttonumkehr
    );
  }
  toggleSchutzhuettenDisplay() {
    this.toggleDisplay(IconArt.schutzhuette,
      'displaySchutzhuetten', // für variablen Zugriff aufs Attribut
      !this.displaySchutzhuetten // Wert umkehren für Buttonumkehr
    );
  }
  toggleKnotenpunkteDisplay() {
    this.toggleDisplay(IconArt.knotenpunkt,
      'displayKnotenpunkte', // für variablen Zugriff aufs Attribut
      !this.displayKnotenpunkte // Wert umkehren für Buttonumkehr
    );
  }


}


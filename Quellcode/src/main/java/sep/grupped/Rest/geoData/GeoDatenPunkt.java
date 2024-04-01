package sep.grupped.Rest.geoData;

import org.osgeo.proj4j.CRSFactory;
import org.osgeo.proj4j.CoordinateReferenceSystem;
import org.osgeo.proj4j.CoordinateTransform;
import org.osgeo.proj4j.ProjCoordinate;
import org.osgeo.proj4j.*;
import javax.persistence.*;

@Entity
@Table(name = "Geodaten")
public class GeoDatenPunkt {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String geometry; //hier nur: Point (GeoJSON-Typ)
  private double laengengrad;
  private double breitengrad;
  private String art; // Schutzhütte/Knotenpunkt/Rettungspunkt/...
  private String ortsbeschreibung; // weitere Infos zur Umgebung des Punktes
  private final String koordinatensystem="EPSG:4326"; // Ziel Koordinaten-Format (!= initiales) für die Karte im Frontend
  // <-> Typ der 3 ausgewählten geodaten: je "urn:ogc:def:crs:EPSG::25832"
  private String icon="/assets/geoIcons/defaultsymbol.png";



  private ProjCoordinate koordinatenUmwandeln(double x, double y) {
    // EPSG:25832 zu WGS84-Format (EPSG:4326)
    String epsg25832 = "+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs";//"urn:ogc:def:crs:EPSG::25832"
    String epsg4326 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";

    CRSFactory crsFactory = new CRSFactory();
    CoordinateReferenceSystem initCRS = crsFactory.createFromParameters("EPSG:25832", epsg25832);
    CoordinateReferenceSystem zielCRS = crsFactory.createFromParameters(this.koordinatensystem, epsg4326);

    CoordinateTransformFactory transformFactory = new CoordinateTransformFactory();
    CoordinateTransform transform = transformFactory.createTransform(initCRS, zielCRS);

    ProjCoordinate srcCoord = new ProjCoordinate(x,y);
    ProjCoordinate coordsConverted = new ProjCoordinate();
    transform.transform(srcCoord, coordsConverted);
    return coordsConverted;
  }


  private void findIconPath(){ // Information fürs frontend setzen
    if (this.art.length() == 0){
      return;
    }
    if(this.art.toLowerCase().contains("Schutzhütte".toLowerCase())){
      this.icon= "/assets/geoIcons/schutzhuettensymbol.png";
    }
    if (this.art.toLowerCase().contains("Rettungspunkt".toLowerCase()) ){
      this.icon= "/assets/geoIcons/rettungspunktsymbol.png";
    }
    if (this.art.toLowerCase().contains("Knotenpunkt".toLowerCase()) ){
      this.icon ="/assets/geoIcons/knotenpunktsymbol.png";
    }
  }

  // ======== Setter:  ========
  public void setXY(double laengengrad, double breitengrad, String koordinatensystemInit) {
    if (koordinatensystemInit.contains("EPSG") && koordinatensystemInit.contains("25832")) {
      ProjCoordinate coords = koordinatenUmwandeln(laengengrad, breitengrad);
      this.laengengrad = coords.x;
      this.breitengrad = coords.y;
    } else{
      System.out.println("etwas ist extrem falsch gelaufen: "+ koordinatensystemInit);
    }
  }
  public void setArt(String art) {
    this.art = art;
    this.findIconPath();
  }
  public void setOrtsbeschreibung(String ortsbeschreibung) {
    this.ortsbeschreibung = ortsbeschreibung;
  }
  public void setGeometry(String geometry) {
    this.geometry = geometry;
  }




  // ======== Getter:  ========
  public String getIcon() { return icon; }
  public String getKoordinatensystem() { return koordinatensystem; }
  public String getOrtsbeschreibung() {
    return ortsbeschreibung;
  }
  public String getArt() {
    return art;
  }
  public Long getId() { return id;  }
  public double getLaengengrad() { return laengengrad;  }
  public double getBreitengrad() { return breitengrad;  }
  public String getGeometry() {return geometry;}


}

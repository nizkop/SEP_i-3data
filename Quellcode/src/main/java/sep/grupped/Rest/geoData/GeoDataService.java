package sep.grupped.Rest.geoData;

import java.io.IOException;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.ArrayList;



@Service
public class GeoDataService {
  private ArrayList<GeoDatenPunkt> geoDatenpunkte = new ArrayList<GeoDatenPunkt>();

  public String readUploadedFile(MultipartFile file) throws IOException {
    byte[] bytes = file.getBytes();
    return new String(bytes); // Inhalt zurückgeben
  }

  public ArrayList<GeoDatenPunkt> parse(MultipartFile file) throws IOException {
    String content = readUploadedFile(file);
    fileInhaltParse(content);
    return geoDatenpunkte;
  }

  public void fileInhaltParse(String rawtext) {
    String koordinatensystem = "";

    // Einheit bzw. Art der Koordinatenangabe herausfinden:
    try
    {
      JSONObject geoobj = new JSONObject(rawtext);
      JSONArray features = geoobj.getJSONArray("features");

      try {
        JSONObject kartenSkala_ebene1 = geoobj.getJSONObject("crs"); // z.B. {"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::25832"}}
        JSONObject kartenSkala_ebene2 = (JSONObject) kartenSkala_ebene1.get("properties"); // z.B. {"name":"urn:ogc:def:crs:EPSG::25832"} = Typ Object; Casting nötig, damit danach .get() möglich
        koordinatensystem = String.valueOf(kartenSkala_ebene2.get("name"));
      } catch (Exception e) {
        System.out.println("Error: Koordinaten-System (Einheit) nicht bestimmbar");
//          throw new IOException("Koordinaten-System (Einheit) nicht bestimmbar");
        return;
      }

      if (geoobj.getString("type").equals("FeatureCollection")) //"feature collection" sollte enthalten sein
      {
        System.out.println("JSON Valid {GeoJSON FeatureCollection}");
        // iterieren über die Feature-Einträge:
        for (int i = 0; i < features.length(); ++i)
        {
          // default-Werte:
          String objekt = "";
          String ort = "";

          JSONObject element = features.getJSONObject(i);

          // Eigenschaften des Datenpunktes:
          JSONObject propertyobj = element.getJSONObject("properties");
          try {
            ort = (String) propertyobj.get("ortsbeschreibung");
          } catch (Exception e) {
//              System.out.println("Datenpunkt ohne Infos: "+e);
          }

          try { //Schutzhütten, Knotenpunkte
            objekt = (String) propertyobj.get("objekt");
          } catch (JSONException e1){ //Rettungspunkte-GeoJSON hat keine "objekt"-Eigenschaft:
            try{
              objekt = (String) element.get("id");
              objekt = objekt.replaceAll("\\d","").replace(".", ""); //Nummerierung entfernen
            } catch (Exception e2) {
              System.out.println("Datenpunkt unbekannter Art (Schutzhütte/Rettungspunkt/Knotenpunkt): "+e2);
            }
          }

          // Check, ob Punkt-Eingabe:
          JSONObject geometry = element.getJSONObject("geometry"); // Geometrie-Typ des GeoJSON-Formats
          String geometrytype = geometry.getString("type");
//            System.out.println("neuer GeoDatenpunkt");
          GeoDatenPunkt geo = new GeoDatenPunkt();
          geo.setGeometry(geometrytype);
          JSONArray coordinates = geometry.getJSONArray("coordinates");
          if(coordinates!=null && coordinates.length() == 2 ){
            geo.setXY(Double.parseDouble(coordinates.getString(0)),Double.parseDouble(coordinates.getString(1)), koordinatensystem);

            // Zusatzinfos speichern:
            geo.setArt(objekt);
            geo.setOrtsbeschreibung(ort);

            geoDatenpunkte.add(geo);
          }
        }
        System.out.println("-> "+ geoDatenpunkte.size()+ " Geo-Datenpunkte ergänzt");
      }
      // Fehlerbehandlung:
      else {
        System.out.println("Error: JSON is not GeoJSON");
      }
    } catch (Exception e) {
      System.out.println("Error: File not found");
    }
  }


  public ArrayList<GeoDatenPunkt> getGeoDatenpunkte() { return geoDatenpunkte;  }


}


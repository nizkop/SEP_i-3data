package sep.grupped.Rest;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import sep.grupped.Rest.geoData.GeoDataController;
import sep.grupped.Rest.geoData.GeoDataService;
import sep.grupped.Rest.geoData.GeoDatenPunkt;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.io.IOException;
import java.nio.file.Paths;
import java.nio.file.Path;
import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
public class GeoDataTest { // bzgl. Controller und Parser

  @Autowired // autowired GeoDataController-Bean
  private GeoDataController geoDataController;

  @Autowired // Autowired GeoDataParser-Bean
  private GeoDataService parser; // wird gebraucht in inputOhneKoordinatensystem

  String scheiterfile = "{ \"type\": \"FeatureCollection\", \"features\": [ { \"type\": \"Feature\", \"geometry\":" +
    " { \"type\": \"Point\", \"coordinates\": [ 1.0, 1E6 ] }, \"properties\": {" +
    " \"ortsbeschreibung\": \"Location\", \"objekt\": \"Beispielobjekt\" } } ] ";
  String inhaltFile = scheiterfile + ",\"totalFeatures\":14,\"numberMatched\":14,\"numberReturned\":14,\"timeStamp\":\"2023-05-17T14:47:25.828Z\",\n" +
    "  \"crs\":{\"type\":\"name\",\"properties\":{\"name\":\"urn:ogc:def:crs:EPSG::25832\"}}}";



  // ======== Hilfsmethoden:  ========
  private String relativZuAbsolut(String pfad){
    Path absolutePath = Paths.get(pfad).toAbsolutePath().normalize();
    return absolutePath.toString();
  }


  // ======== Tests für Datenupload = Funktionalität wie sie sein sollte:  ========
  @Test
  public void checkAllGeoFiles() throws IOException {
    String pfad = "src/assets/geoTestDateien/";
    String[] dateien = {"schutzhuetten.json", "knotenpunkte.json", "rettungspunkte.json"};
    int[] sollGroessen = {14, 96, 131}; // ! Addition: die zuvor eingelesenen Daten bleiben bestehen
    int[] sollGroessenOhneSpeichern  = {14, 82, 35}; // Längen der einzelnen Datensätze
    for(int i = 0; i < dateien.length; i++){
      List<GeoDatenPunkt> uploadedData = this.testUploadDataFromExampleFile(pfad+dateien[i]);
      int expectedSize = uploadedData.size() == sollGroessen[i] ? sollGroessen[i] : sollGroessenOhneSpeichern[i];
      assertEquals(expectedSize, uploadedData.size());
    }
  }

  private List<GeoDatenPunkt> testUploadDataFromExampleFile(String filePath) throws IOException { // testet nur, ob Objekte gefunden werden & EInlesen an sich klappt
    System.out.println("Test: GeoJSOn-Upload per Beispielfile: "+  relativZuAbsolut(filePath));
    // frontend-Datei-Einlesen simulieren:
    byte[] fileContent = Files.readAllBytes(Paths.get(relativZuAbsolut(filePath)));
    MultipartFile file = new MockMultipartFile("geofile", relativZuAbsolut(filePath), "application/json", fileContent);

    // Upload:
    ResponseEntity<List<GeoDatenPunkt>> response = geoDataController.uploadData(file); // <- zu testende Funktion
    assertEquals(HttpStatus.OK, response.getStatusCode());

    // Daten-Check:
    List<GeoDatenPunkt> uploadedData = response.getBody();
    assertNotNull(uploadedData);
    return uploadedData;
  }



  @Test
  public void testGeoDatenPunktErstellung() {
    byte[] contentBytes = this.inhaltFile.getBytes(StandardCharsets.UTF_8);
    MockMultipartFile file = new MockMultipartFile("geofile", "sample.json",
      "application/json", contentBytes);

    ResponseEntity<List<GeoDatenPunkt>> response;
    response = geoDataController.uploadData(file);

    // Verifizierung:
    assertEquals(HttpStatus.OK, response.getStatusCode());
    List<GeoDatenPunkt> uploadedData = response.getBody();
    assertNotNull(uploadedData);
    int expectedSize = uploadedData.size() == 132 ? 132 : 1;    // Überprüfen, ob die Länge entweder 132 (mit anderen Tests davor) oder 1 (separater Testdurchlauf) beträgt
    assertEquals(expectedSize, uploadedData.size());
    GeoDatenPunkt geoDatenPunkt = uploadedData.get(uploadedData.size()-1) ;
    assertNotNull(geoDatenPunkt);

    assertNotNull(geoDatenPunkt.getBreitengrad());
    assertEquals(4.455, Math.round(geoDatenPunkt.getLaengengrad()*1000.0)/1000.0); // Runden auf drei Dezimalstellen
    assertEquals(9.018, Math.round(geoDatenPunkt.getBreitengrad() * 1000.0) / 1000.0);
    assertEquals("Beispielobjekt", geoDatenPunkt.getArt());
    assertEquals("Location", geoDatenPunkt.getOrtsbeschreibung());
    assertEquals("Point", geoDatenPunkt.getGeometry());
    assertFalse(geoDatenPunkt.getIcon().isEmpty());
  }


  // ======== Tests für Fehlerfälle:  ========
  @Test
  public void inputOhneFile() {
    MockMultipartFile file = new MockMultipartFile(
      "geofile", "testfile.json","application/json",
      "invalid_content".getBytes()
    );
    // entweder IOException ODER invalid_content als Ergebnis:
    String result;
    try {
      result = parser.readUploadedFile(file);
    } catch (IOException e) {
      result = "invalid_content";
    }
    assertEquals("invalid_content", result);
  }


  @Test
  public void inputOhneKoordinatensystem() throws Exception {
    // Koordinatensystem unbekannt, d.h. Umrechnung kann nicht erfolgen -> sollte zu Abbruch des Einlesens führen:
    byte[] contentBytes = this.scheiterfile.getBytes(StandardCharsets.UTF_8);
    MockMultipartFile file = new MockMultipartFile("geofile", "sample.json", "application/json", contentBytes);

    ArrayList<GeoDatenPunkt> result = parser.parse(file);
    assertEquals(result.size(), 0);
  }


}

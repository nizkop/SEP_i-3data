package sep.grupped.Rest.geoData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/geo")
@CrossOrigin(origins = "http://localhost:4200")
public class GeoDataController {
  @Autowired
  GeoDataRepository geoDataRepository;
  private final GeoDataService parser;

  public GeoDataController() {
    this.parser = new GeoDataService();
  }

  @GetMapping("")
  public List<GeoDatenPunkt> getDatensaetze()
  {
    return geoDataRepository.findAll();
  }


  @PostMapping("/upload")
  public ResponseEntity<List<GeoDatenPunkt>> uploadData(@RequestParam("file") MultipartFile geofile) {
    System.out.println("uploadData (GeoDataController)");
    List<GeoDatenPunkt> geoDatenPunktList;

    try {
      this.parser.parse(geofile);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
    // Speichern:
    geoDatenPunktList = this.parser.getGeoDatenpunkte();
    geoDatenPunktList.forEach(record->{
      geoDataRepository.save(record);
    });

    return ResponseEntity.ok(geoDatenPunktList);
  }

}

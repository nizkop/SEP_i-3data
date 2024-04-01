package sep.grupped.Rest.Tabellen.Table7;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Datensaetze/table7")
@CrossOrigin(origins = "http://localhost:4200")
public class Table7Controller {
  @Autowired
  Table7Repository table7Repository;

  private final Table7Service table7Service;

  public Table7Controller(Table7Service table7Service) {
    this.table7Service = table7Service;
  }

  @PostMapping("/upload")
  public ResponseEntity<String> uploadCsvFile(@RequestParam("file") MultipartFile file) {
    if (file.isEmpty()) {
      return new ResponseEntity<>("Bitte wählen Sie eine CSV-Datei aus.", HttpStatus.BAD_REQUEST);
    }

    try {
      List<Strassenliste> strassenlisteList = table7Service.parseCsvFile(file);
      strassenlisteList.forEach(record ->{
        Strassenliste strassenliste = new Strassenliste();
        strassenliste.setFid(record.getFid());
        strassenliste.setStrassenschluessel(record.getStrassenschluessel());
        strassenliste.setGemeindeschluessel(record.getGemeindeschluessel());
        strassenliste.setStrasse(record.getStrasse());
        table7Repository.save(strassenliste);
      });
      return new ResponseEntity<>("CSV Datei hochgeladen und erfolgreich analysiert.", HttpStatus.OK);
    } catch (IOException e) {
      return new ResponseEntity<>("Fehler beim Parsen der CSV-Datei.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @PostMapping("/add")
  public void createEntry(@RequestBody Strassenliste strassenliste) {
    table7Repository.save(strassenliste);
  }
  @GetMapping("/get/{entryId}")
  public Strassenliste getEntry(@PathVariable Long entryId) {
    Optional<Strassenliste> strassenliste = table7Repository.findById(entryId);
    if(strassenliste.isPresent()){
      return strassenliste.get();
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Kein Eintrag mit dieser ID gefunden.");

  }
//  @GetMapping("/tablename")
//  public String getTableName(){
//    Strassenliste strassenliste = new Strassenliste();
//    return strassenliste.getTableName();
//  }
  @PutMapping("/update/{entryId}")
  public void updateEntry(@PathVariable Long entryId, @RequestBody Strassenliste strassenlisteUpdate) {
    Optional<Strassenliste> strassenliste = table7Repository.findById(entryId);
    if(!strassenliste.isPresent()){
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Kein Eintrag mit dieser ID gefunden.");
    }
    Strassenliste strassenlisteInstance = strassenliste.get();
    strassenlisteInstance.setFid(strassenlisteUpdate.getFid());
    strassenlisteInstance.setGemeindeschluessel(strassenlisteUpdate.getGemeindeschluessel());
    strassenlisteInstance.setStrassenschluessel(strassenlisteUpdate.getStrassenschluessel());
    strassenlisteInstance.setStrasse(strassenlisteUpdate.getStrasse());
    table7Repository.save(strassenlisteInstance);
  }
  @DeleteMapping ("/delete/{entryId}")
  public void deleteEntry(@PathVariable Long entryId) {
    Optional<Strassenliste> strassenliste = table7Repository.findById(entryId);
    if(strassenliste.isPresent()){
      table7Repository.deleteById(entryId);
      return;
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Kein Eintrag mit dieser ID gefunden.");
  }
  @GetMapping("")
  public List<Strassenliste> getDatensaetze()
  {
    return (List<Strassenliste>) table7Repository.findAll();
  }
}

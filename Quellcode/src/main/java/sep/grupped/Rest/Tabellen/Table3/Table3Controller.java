package sep.grupped.Rest.Tabellen.Table3;

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
@RequestMapping("/Datensaetze/table3")
@CrossOrigin(origins = "http://localhost:4200")
public class Table3Controller {
  @Autowired
  Table3Repository table3Repository;
  private final Table3Service table3Service;

  public Table3Controller(Table3Service table3Service) {
    this.table3Service = table3Service;
  }

  @PostMapping("/upload")
  public ResponseEntity<String> uploadCsvFile(@RequestParam("file") MultipartFile file) {
    if (file.isEmpty()) {
      return new ResponseEntity<>("Bitte wählen Sie eine CSV-Datei aus.", HttpStatus.BAD_REQUEST);
    }

    try {
      List<Arbeitssuchende> arbeitssuchendeList = table3Service.parseCsvFile(file);
      table3Repository.saveAll(arbeitssuchendeList);
      return new ResponseEntity<>("CSV Datei hochgeladen und erfolgreich analysiert.", HttpStatus.OK);
    } catch (IOException e) {
      return new ResponseEntity<>("Fehler beim Parsen der CSV-Datei.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @PostMapping("/add")
  public void createEntry(@RequestBody Arbeitssuchende arbeitssuchende) {
    table3Repository.save(arbeitssuchende);
  }
  @GetMapping("/get/{entryId}")
  public Arbeitssuchende getEntry(@PathVariable Long entryId) {
    Optional<Arbeitssuchende> arbeitssuchende = table3Repository.findById(entryId);
    if(arbeitssuchende.isPresent()){
      return arbeitssuchende.get();
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Kein Eintrag mit dieser ID gefunden.");

  }
  @PutMapping("/update/{entryId}")
  public void updateEntry(@PathVariable Long entryId, @RequestBody Arbeitssuchende arbeitssuchendeUpdate) {
    Optional<Arbeitssuchende> arbeitssuchende = table3Repository.findById(entryId);
    if(!arbeitssuchende.isPresent()){
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Kein Eintrag mit dieser ID gefunden.");
    }
    Arbeitssuchende arbeitssuchendeInstance = arbeitssuchende.get();
    arbeitssuchendeInstance.setDatum(arbeitssuchendeUpdate.getDatum());
    arbeitssuchendeInstance.setCol1(arbeitssuchendeUpdate.getCol1());
    arbeitssuchendeInstance.setCol2(arbeitssuchendeUpdate.getCol2());
    arbeitssuchendeInstance.setCol3(arbeitssuchendeUpdate.getCol3());
    arbeitssuchendeInstance.setCol4(arbeitssuchendeUpdate.getCol4());
    arbeitssuchendeInstance.setCol5(arbeitssuchendeUpdate.getCol5());
    arbeitssuchendeInstance.setCol6(arbeitssuchendeUpdate.getCol6());
    arbeitssuchendeInstance.setCol7(arbeitssuchendeUpdate.getCol7());
    arbeitssuchendeInstance.setCol8(arbeitssuchendeUpdate.getCol8());
    arbeitssuchendeInstance.setCol9(arbeitssuchendeUpdate.getCol9());
    arbeitssuchendeInstance.setCol10(arbeitssuchendeUpdate.getCol10());
    arbeitssuchendeInstance.setCol11(arbeitssuchendeUpdate.getCol11());
    table3Repository.save(arbeitssuchendeInstance);
  }
  @DeleteMapping ("/delete/{entryId}")
  public void deleteEntry(@PathVariable Long entryId) {
    Optional<Arbeitssuchende> arbeitssuchende = table3Repository.findById(entryId);
    if(arbeitssuchende.isPresent()){
      table3Repository.deleteById(entryId);
      return;
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Kein Eintrag mit dieser ID gefunden.");
  }
  @GetMapping("")
  public List<Arbeitssuchende> getDatensaetze()
  {
    return (List<Arbeitssuchende>) table3Repository.findAll();
  }
}

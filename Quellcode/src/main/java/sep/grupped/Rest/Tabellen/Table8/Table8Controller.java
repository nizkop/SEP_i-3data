package sep.grupped.Rest.Tabellen.Table8;

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
@RequestMapping("/Datensaetze/table8")
@CrossOrigin(origins = "http://localhost:4200")
public class Table8Controller {
  @Autowired
  Table8Repository table8Repository;
  private final Table8Service table8Service;

  public Table8Controller(Table8Service table8Service) {
    this.table8Service = table8Service;
  }

  @PostMapping("/upload")
  public ResponseEntity<String> uploadCsvFile(@RequestParam("file") MultipartFile file) {
    if (file.isEmpty()) {
      return new ResponseEntity<>("Bitte wählen Sie eine CSV-Datei aus.", HttpStatus.BAD_REQUEST);
    }

    try {
      List<Geburten> geburtenList = table8Service.parseCsvFile(file);
      table8Repository.saveAll(geburtenList);
      return new ResponseEntity<>("CSV Datei hochgeladen und erfolgreich analysiert.", HttpStatus.OK);
    } catch (IOException e) {
      return new ResponseEntity<>("Fehler beim Parsen der CSV-Datei.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @PostMapping("/add")
  public void createEntry(@RequestBody Geburten geburten) {
    table8Repository.save(geburten);
  }
  @GetMapping("/get/{entryId}")
  public Geburten getEntry(@PathVariable Long entryId) {
    Optional<Geburten> geburten = table8Repository.findById(entryId);
    if(geburten.isPresent()){
      return geburten.get();
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Kein Eintrag mit dieser ID gefunden.");

  }
  @PutMapping("/update/{entryId}")
  public void updateEntry(@PathVariable Long entryId, @RequestBody Geburten geburtenUpdate) {
    Optional<Geburten> geburten = table8Repository.findById(entryId);
    if(!geburten.isPresent()){
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Kein Eintrag mit dieser ID gefunden.");
    }
    Geburten geburtenInstance = geburten.get();
    geburtenInstance.setJanuar(geburtenUpdate.getJanuar());
    geburtenInstance.setFebruar(geburtenUpdate.getFebruar());
    geburtenInstance.setMaerz(geburtenUpdate.getMaerz());
    geburtenInstance.setApril(geburtenUpdate.getApril());
    geburtenInstance.setMai(geburtenUpdate.getMai());
    geburtenInstance.setJuni(geburtenUpdate.getJuni());
    geburtenInstance.setJuli(geburtenUpdate.getJuli());
    geburtenInstance.setAugust(geburtenUpdate.getAugust());
    geburtenInstance.setSeptember(geburtenUpdate.getSeptember());
    geburtenInstance.setOktober(geburtenUpdate.getOktober());
    geburtenInstance.setNovember(geburtenUpdate.getNovember());
    geburtenInstance.setDezember(geburtenUpdate.getDezember());
    geburtenInstance.setGesamt(geburtenUpdate.getGesamt());
    table8Repository.save(geburtenInstance);
  }
  @DeleteMapping ("/delete/{entryId}")
  public void deleteEntry(@PathVariable Long entryId) {
    Optional<Geburten> geburten = table8Repository.findById(entryId);
    if(geburten.isPresent()){
      table8Repository.deleteById(entryId);
      return;
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Kein Eintrag mit dieser ID gefunden.");
  }
  @GetMapping("")
  public List<Geburten> getDatensaetze()
  {
    return (List<Geburten>) table8Repository.findAll();
  }
}

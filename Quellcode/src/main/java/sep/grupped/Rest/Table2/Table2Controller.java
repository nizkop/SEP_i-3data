package sep.grupped.Rest.Table2;

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
@RequestMapping("/Datensaetze/table2")
@CrossOrigin(origins = "http://localhost:4200")
public class Table2Controller {
  @Autowired
  Table2Repository table2Repository;
  private final Table2Service table2Service;

  public Table2Controller(Table2Service table2Service) {
    this.table2Service = table2Service;
  }

  @PostMapping("/upload")
  public ResponseEntity<String> uploadCsvFile(@RequestParam("file") MultipartFile file) {
    if (file.isEmpty()) {
      return new ResponseEntity<>("Please select a CSV file.", HttpStatus.BAD_REQUEST);
    }

    try {
      List<Sterbefaelle> sterbefaelleList = table2Service.parseCsvFile(file);
      table2Repository.saveAll(sterbefaelleList);
      return new ResponseEntity<>("CSV file uploaded and parsed successfully.", HttpStatus.OK);
    } catch (IOException e) {
      return new ResponseEntity<>("Error occurred while processing the CSV file.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @PostMapping("/add")
  public void createEntry(@RequestBody Sterbefaelle sterbefaelle) {
    table2Repository.save(sterbefaelle);
  }
  @GetMapping("/get/{entryId}")
  public Sterbefaelle getEntry(@PathVariable Long entryId) {
    Optional<Sterbefaelle> sterbefaelle = table2Repository.findById(entryId);
    if(sterbefaelle.isPresent()){
      return sterbefaelle.get();
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found with this ID");

  }
  @PutMapping("/update/{entryId}")
  public void updateEntry(@PathVariable Long entryId, @RequestBody Sterbefaelle sterbefaelleUpdate) {
    Optional<Sterbefaelle> sterbefaelle = table2Repository.findById(entryId);
    if(!sterbefaelle.isPresent()){
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found with this ID");
    }
    Sterbefaelle sterbefaelleInstance = sterbefaelle.get();
    sterbefaelleInstance.setJanuar(sterbefaelleUpdate.getJanuar());
    sterbefaelleInstance.setFebruar(sterbefaelleUpdate.getFebruar());
    sterbefaelleInstance.setMaerz(sterbefaelleUpdate.getMaerz());
    sterbefaelleInstance.setApril(sterbefaelleUpdate.getApril());
    sterbefaelleInstance.setMai(sterbefaelleUpdate.getMai());
    sterbefaelleInstance.setJuni(sterbefaelleUpdate.getJuni());
    sterbefaelleInstance.setJuli(sterbefaelleUpdate.getJuli());
    sterbefaelleInstance.setAugust(sterbefaelleUpdate.getAugust());
    sterbefaelleInstance.setSeptember(sterbefaelleUpdate.getSeptember());
    sterbefaelleInstance.setOktober(sterbefaelleUpdate.getOktober());
    sterbefaelleInstance.setNovember(sterbefaelleUpdate.getNovember());
    sterbefaelleInstance.setDezember(sterbefaelleUpdate.getDezember());
    sterbefaelleInstance.setGesamt(sterbefaelleUpdate.getGesamt());
    table2Repository.save(sterbefaelleInstance);
  }
  @DeleteMapping ("/delete/{entryId}")
  public void deleteEntry(@PathVariable Long entryId) {
    Optional<Sterbefaelle> sterbefaelle = table2Repository.findById(entryId);
    if(sterbefaelle.isPresent()){
      table2Repository.deleteById(entryId);
      return;
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found with this ID");
  }
  @GetMapping("")
  public List<Sterbefaelle> getDatensaetze()
  {
    return (List<Sterbefaelle>) table2Repository.findAll();
  }
}

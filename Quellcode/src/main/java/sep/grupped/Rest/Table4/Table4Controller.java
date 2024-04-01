package sep.grupped.Rest.Table4;

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
@RequestMapping("/Datensaetze/table4")
@CrossOrigin(origins = "http://localhost:4200")
public class Table4Controller {
  @Autowired
  Table4Repository table4Repository;
  private final Table4Service table4Service;

  public Table4Controller(Table4Service table4Service) {
    this.table4Service = table4Service;
  }

  @PostMapping("/upload")
  public ResponseEntity<String> uploadCsvFile(@RequestParam("file") MultipartFile file) {
    if (file.isEmpty()) {
      return new ResponseEntity<>("Please select a CSV file.", HttpStatus.BAD_REQUEST);
    }

    try {
      List<Arbeitslose> arbeitsloseList = table4Service.parseCsvFile(file);
      table4Repository.saveAll(arbeitsloseList);
      return new ResponseEntity<>("CSV file uploaded and parsed successfully.", HttpStatus.OK);
    } catch (IOException e) {
      return new ResponseEntity<>("Error occurred while processing the CSV file.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @PostMapping("/add")
  public void createEntry(@RequestBody Arbeitslose arbeitslose) {
    table4Repository.save(arbeitslose);
  }
  @GetMapping("/get/{entryId}")
  public Arbeitslose getEntry(@PathVariable Long entryId) {
    Optional<Arbeitslose> arbeitslose = table4Repository.findById(entryId);
    if(arbeitslose.isPresent()){
      return arbeitslose.get();
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found with this ID");

  }
  @PutMapping("/update/{entryId}")
  public void updateEntry(@PathVariable Long entryId, @RequestBody Arbeitslose arbeitsloseUpdate) {
    Optional<Arbeitslose> arbeitslose = table4Repository.findById(entryId);
    if(!arbeitslose.isPresent()){
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found with this ID");
    }
    Arbeitslose arbeitsloseInstance = arbeitslose.get();
    arbeitsloseInstance.setDatum(arbeitsloseUpdate.getDatum());
    arbeitsloseInstance.setCol1(arbeitsloseUpdate.getCol1());
    arbeitsloseInstance.setCol2(arbeitsloseUpdate.getCol2());
    arbeitsloseInstance.setCol3(arbeitsloseUpdate.getCol3());
    arbeitsloseInstance.setCol4(arbeitsloseUpdate.getCol4());
    arbeitsloseInstance.setCol5(arbeitsloseUpdate.getCol5());
    arbeitsloseInstance.setCol6(arbeitsloseUpdate.getCol6());
    arbeitsloseInstance.setCol7(arbeitsloseUpdate.getCol7());
    arbeitsloseInstance.setCol8(arbeitsloseUpdate.getCol8());
    arbeitsloseInstance.setCol9(arbeitsloseUpdate.getCol9());
    arbeitsloseInstance.setCol10(arbeitsloseUpdate.getCol10());
    arbeitsloseInstance.setCol11(arbeitsloseUpdate.getCol11());
    arbeitsloseInstance.setCol12(arbeitsloseInstance.getCol12());
    table4Repository.save(arbeitsloseInstance);
  }
  @DeleteMapping ("/delete/{entryId}")
  public void deleteEntry(@PathVariable Long entryId) {
    Optional<Arbeitslose> arbeitslose = table4Repository.findById(entryId);
    if(arbeitslose.isPresent()){
      table4Repository.deleteById(entryId);
      return;
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found with this ID");
  }
  @GetMapping("")
  public List<Arbeitslose> getDatensaetze()
  {
    return (List<Arbeitslose>) table4Repository.findAll();
  }
}

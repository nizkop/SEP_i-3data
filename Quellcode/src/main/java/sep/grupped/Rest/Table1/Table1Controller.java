package sep.grupped.Rest.Table1;

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
@RequestMapping("/Datensaetze/table1")
@CrossOrigin(origins = "http://localhost:4200")
public class Table1Controller {
  @Autowired
  Table1Repository table1Repository;

  private final Table1Service table1Service;

  public Table1Controller(Table1Service table1Service) {
    this.table1Service = table1Service;
  }

  @PostMapping("/upload")
  public ResponseEntity<String> uploadCsvFile(@RequestParam("file") MultipartFile file) {
    if (file.isEmpty()) {
      return new ResponseEntity<>("Please select a CSV file.", HttpStatus.BAD_REQUEST);
    }

    try {
      List<VnNeugeboreneAC> vnNeugeboreneACList = table1Service.parseCsvFile(file);
      vnNeugeboreneACList.forEach(record ->{
        VnNeugeboreneAC vnNeugeboreneAC = new VnNeugeboreneAC();
        vnNeugeboreneAC.setAnzahl(record.getAnzahl());
        vnNeugeboreneAC.setVorname(record.getVorname());
        vnNeugeboreneAC.setGeschlecht(record.getGeschlecht());
        vnNeugeboreneAC.setPosition(record.getPosition());
        table1Repository.save(vnNeugeboreneAC);
      });
      return new ResponseEntity<>("CSV file uploaded and parsed successfully.", HttpStatus.OK);
    } catch (IOException e) {
      return new ResponseEntity<>("Error occurred while processing the CSV file.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
    @PostMapping("/add")
    public void createEntry(@RequestBody VnNeugeboreneAC vnNeugeboreneAC) {
        table1Repository.save(vnNeugeboreneAC);
    }
    @GetMapping("/get/{entryId}")
    public VnNeugeboreneAC getEntry(@PathVariable Long entryId) {
        Optional<VnNeugeboreneAC> vnNeugeboreneAC = table1Repository.findById(entryId);
        if(vnNeugeboreneAC.isPresent()){
            return vnNeugeboreneAC.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found with this ID");

    }
    @GetMapping("/tablename")
    public String getTableName(){
      VnNeugeboreneAC vnNeugeboreneAC = new VnNeugeboreneAC();
      return vnNeugeboreneAC.getTableName();
    }
    @PutMapping("/update/{entryId}")
    public void updateEntry(@PathVariable Long entryId, @RequestBody VnNeugeboreneAC vnNeugeboreneACUpdate) {
        Optional<VnNeugeboreneAC> vnNeugeboreneAC = table1Repository.findById(entryId);
        if(!vnNeugeboreneAC.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found with this ID");
        }
        VnNeugeboreneAC vnNeugeboreneACInstance = vnNeugeboreneAC.get();
        vnNeugeboreneACInstance.setAnzahl(vnNeugeboreneACUpdate.getAnzahl());
        vnNeugeboreneACInstance.setVorname(vnNeugeboreneACUpdate.getVorname());
        vnNeugeboreneACInstance.setGeschlecht(vnNeugeboreneACUpdate.getGeschlecht());
        vnNeugeboreneACInstance.setPosition(vnNeugeboreneACUpdate.getPosition());
        table1Repository.save(vnNeugeboreneACInstance);
    }
    @DeleteMapping ("/delete/{entryId}")
    public void deleteEntry(@PathVariable Long entryId) {
        Optional<VnNeugeboreneAC> vnNeugeboreneAC = table1Repository.findById(entryId);
        if(vnNeugeboreneAC.isPresent()){
            table1Repository.deleteById(entryId);
            return;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found with this ID");
    }
    @GetMapping("")
    public List<VnNeugeboreneAC> getDatensaetze()
    {
        return (List<VnNeugeboreneAC>) table1Repository.findAll();
    }
}

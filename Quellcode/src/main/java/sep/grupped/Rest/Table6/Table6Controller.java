package sep.grupped.Rest.Table6;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Datensaetze/table6")
@CrossOrigin(origins = "http://localhost:4200")
public class Table6Controller {
  @Autowired
  Table6Repository table6Repository;
  private final Table6Service table6Service;

  public Table6Controller(Table6Service table6Service) {
    this.table6Service = table6Service;
  }
  @PostMapping("/upload")
  public ResponseEntity<List<Privathaushalte>> uploadPopulationData(@RequestParam("file") MultipartFile xmlFile) {
    PHParserDOM parser = new PHParserDOM();
    List<Privathaushalte> privathaushalteList = new ArrayList<>();
    try (InputStream inputStream = xmlFile.getInputStream()) {
      privathaushalteList = parser.parse(inputStream);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    privathaushalteList.forEach(record->{
      System.out.print(record);
      table6Repository.save(record);
    });

    return ResponseEntity.ok(privathaushalteList);
  }
  @PostMapping("/add")
  public void createEntry(@RequestBody Privathaushalte privathaushalte) {
    table6Repository.save(privathaushalte);
  }
  @GetMapping("/get/{entryId}")
  public Privathaushalte getEntry(@PathVariable Long entryId) {
    Optional<Privathaushalte> privathaushalte = table6Repository.findById(entryId);
    if(privathaushalte.isPresent()){
      return privathaushalte.get();
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found with this ID");

  }
  @PutMapping("/update/{entryId}")
  public void updateEntry(@PathVariable Long entryId, @RequestBody Privathaushalte privathaushalteUpdate) {
    Optional<Privathaushalte> privathaushalte = table6Repository.findById(entryId);
    if(!privathaushalte.isPresent()){
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found with this ID");
    }
    Privathaushalte privathaushalteInstance = privathaushalte.get();
    privathaushalteInstance.setBezirk(privathaushalteUpdate.getBezirk());
    privathaushalteInstance.setState(privathaushalteUpdate.getState());
    privathaushalteInstance.setAnzahl(privathaushalteUpdate.getAnzahl());
    privathaushalteInstance.setCity(privathaushalteUpdate.getCity());
    privathaushalteInstance.setJahr(privathaushalteUpdate.getJahr());
    table6Repository.save(privathaushalteInstance);
  }
  @DeleteMapping ("/delete/{entryId}")
  public void deleteEntry(@PathVariable Long entryId) {
    Optional<Privathaushalte> privathaushalte = table6Repository.findById(entryId);
    if(privathaushalte.isPresent()){
      table6Repository.deleteById(entryId);
      return;
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found with this ID");
  }
  @GetMapping("")
  public List<Privathaushalte> getDatensaetze()
  {
    return (List<Privathaushalte>) table6Repository.findAll();
  }
}

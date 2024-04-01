package sep.grupped.Rest.Table5;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Datensaetze/table5")
@CrossOrigin(origins = "http://localhost:4200")
public class Table5Controller {
  @Autowired
  Table5Repository table5Repository;
  private final Table5Service table5Service;

  public Table5Controller(Table5Service table5Service) {
    this.table5Service = table5Service;
  }
  @PostMapping("/upload")
  public ResponseEntity<List<MittlereJahresBevoelkerung>> uploadPopulationData(@RequestParam("file") MultipartFile xmlFile) {
    MJBParserDOM parser = new MJBParserDOM();
    List<MittlereJahresBevoelkerung> mittlereJahresBevoelkerungList;
    try (InputStream inputStream = xmlFile.getInputStream()) {
      mittlereJahresBevoelkerungList = parser.parse(inputStream);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    mittlereJahresBevoelkerungList.forEach(record->{
      System.out.print(record);
      table5Repository.save(record);
    });

    return ResponseEntity.ok(mittlereJahresBevoelkerungList);
  }
  @PostMapping("/add")
  public void createEntry(@RequestBody MittlereJahresBevoelkerung mittlereJahresBevoelkerung) {
    table5Repository.save(mittlereJahresBevoelkerung);
  }
  @GetMapping("/get/{entryId}")
  public MittlereJahresBevoelkerung getEntry(@PathVariable Long entryId) {
    Optional<MittlereJahresBevoelkerung> mittlereJahresBevoelkerung = table5Repository.findById(entryId);
    if(mittlereJahresBevoelkerung.isPresent()){
      return mittlereJahresBevoelkerung.get();
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found with this ID");

  }
  @PutMapping("/update/{entryId}")
  public void updateEntry(@PathVariable Long entryId, @RequestBody MittlereJahresBevoelkerung mittlereJahresBevoelkerungUpdate) {
    Optional<MittlereJahresBevoelkerung> mittlereJahresBevoelkerung = table5Repository.findById(entryId);
    if(!mittlereJahresBevoelkerung.isPresent()){
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found with this ID");
    }
    MittlereJahresBevoelkerung mittlereJahresBevoelkerungInstance = mittlereJahresBevoelkerung.get();
    mittlereJahresBevoelkerungInstance.setAmountAll(mittlereJahresBevoelkerungUpdate.getAmountAll());
    mittlereJahresBevoelkerungInstance.setAmountFemale(mittlereJahresBevoelkerungUpdate.getAmountFemale());
    mittlereJahresBevoelkerungInstance.setAmountMale(mittlereJahresBevoelkerungUpdate.getAmountMale());
    mittlereJahresBevoelkerungInstance.setBezirk(mittlereJahresBevoelkerungInstance.getBezirk());
    mittlereJahresBevoelkerungInstance.setState(mittlereJahresBevoelkerungInstance.getState());
    mittlereJahresBevoelkerungInstance.setCity(mittlereJahresBevoelkerungUpdate.getCity());
    mittlereJahresBevoelkerungInstance.setJahr(mittlereJahresBevoelkerungUpdate.getJahr());
    table5Repository.save(mittlereJahresBevoelkerungInstance);
  }
  @DeleteMapping ("/delete/{entryId}")
  public void deleteEntry(@PathVariable Long entryId) {
    Optional<MittlereJahresBevoelkerung> mittlereJahresBevoelkerung = table5Repository.findById(entryId);
    if(mittlereJahresBevoelkerung.isPresent()){
      table5Repository.deleteById(entryId);
      return;
    }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found with this ID");
  }
  @GetMapping("")
  public List<MittlereJahresBevoelkerung> getDatensaetze()
  {
    return (List<MittlereJahresBevoelkerung>) table5Repository.findAll();
  }
}

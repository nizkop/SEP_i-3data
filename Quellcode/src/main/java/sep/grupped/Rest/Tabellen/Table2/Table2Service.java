package sep.grupped.Rest.Tabellen.Table2;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class Table2Service {

  public List<Sterbefaelle> parseCsvFile(MultipartFile file) throws IOException {
    try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
      CSVParser csvParser = new CSVParser(fileReader, CSVFormat.DEFAULT.withDelimiter(','));

      List<CSVRecord> records = csvParser.getRecords();
      List<Sterbefaelle> sterbefaelleList = new ArrayList<>();
      // Transpose
      List<List<String>> transposedRecords = new ArrayList<>();
      int numRows = records.size();
      int numCols = records.get(0).size();

      for (int i = 0; i < numCols; i++) {
        List<String> newRow = new ArrayList<>();
        for (int j = 0; j < numRows; j++) {
          newRow.add(records.get(j).get(i));
        }
        transposedRecords.add(newRow);
      }
      for (int i = 1; i < transposedRecords.size(); i++) {
        List<String> row = transposedRecords.get(i);

        Sterbefaelle sterbefaelle = new Sterbefaelle();
        sterbefaelle.setJahr(Integer.parseInt(row.get(0)));
        sterbefaelle.setJanuar(Integer.parseInt(row.get(1)));
        sterbefaelle.setFebruar(Integer.parseInt(row.get(2)));
        sterbefaelle.setMaerz(Integer.parseInt(row.get(3)));
        sterbefaelle.setApril(Integer.parseInt(row.get(4)));
        sterbefaelle.setMai(Integer.parseInt(row.get(5)));
        sterbefaelle.setJuni(Integer.parseInt(row.get(6)));
        sterbefaelle.setJuli(Integer.parseInt(row.get(7)));
        sterbefaelle.setAugust(Integer.parseInt(row.get(8)));
        sterbefaelle.setSeptember(Integer.parseInt(row.get(9)));
        sterbefaelle.setOktober(Integer.parseInt(row.get(10)));
        sterbefaelle.setNovember(Integer.parseInt(row.get(11)));
        sterbefaelle.setDezember(Integer.parseInt(row.get(12)));
        sterbefaelle.setGesamt(Integer.parseInt(row.get(13)));

        sterbefaelleList.add(sterbefaelle);
      }

      return sterbefaelleList;
    }
  }
}

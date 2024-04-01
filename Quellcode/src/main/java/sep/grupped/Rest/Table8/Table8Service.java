package sep.grupped.Rest.Table8;

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
public class Table8Service {

  public List<Geburten> parseCsvFile(MultipartFile file) throws IOException {
    try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
      CSVParser csvParser = new CSVParser(fileReader, CSVFormat.DEFAULT.withDelimiter(','));

      List<CSVRecord> records = csvParser.getRecords();
      List<Geburten> geburtenList = new ArrayList<>();
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

        Geburten geburten = new Geburten();
        geburten.setJahr(Integer.parseInt(row.get(0)));
        geburten.setJanuar(Integer.parseInt(row.get(1)));
        geburten.setFebruar(Integer.parseInt(row.get(2)));
        geburten.setMaerz(Integer.parseInt(row.get(3)));
        geburten.setApril(Integer.parseInt(row.get(4)));
        geburten.setMai(Integer.parseInt(row.get(5)));
        geburten.setJuni(Integer.parseInt(row.get(6)));
        geburten.setJuli(Integer.parseInt(row.get(7)));
        geburten.setAugust(Integer.parseInt(row.get(8)));
        geburten.setSeptember(Integer.parseInt(row.get(9)));
        geburten.setOktober(Integer.parseInt(row.get(10)));
        geburten.setNovember(Integer.parseInt(row.get(11)));
        geburten.setDezember(Integer.parseInt(row.get(12)));
        geburten.setGesamt(Integer.parseInt(row.get(13)));

        geburtenList.add(geburten);
      }

      return geburtenList;
    }
  }
}


package sep.grupped.Rest.Table3;

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
public class Table3Service {

  public List<Arbeitssuchende> parseCsvFile(MultipartFile file) throws IOException {
    try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
      CSVParser csvParser = new CSVParser(fileReader, CSVFormat.DEFAULT.withDelimiter(';'));

      List<CSVRecord> records = csvParser.getRecords();
      List<Arbeitssuchende> arbeitssuchendeList = new ArrayList<>();
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

        Arbeitssuchende arbeitssuchende = new Arbeitssuchende();
        arbeitssuchende.setDatum(row.get(0));
        for (int j = 1; j <= 11; j++) {
          String value = row.get(j).replace(".", "").trim();
          int intValue = value.isEmpty() ? 0 : Integer.parseInt(value);
          switch (j) {
            case 1 -> arbeitssuchende.setCol1(intValue);
            case 2 -> arbeitssuchende.setCol2(intValue);
            case 3 -> arbeitssuchende.setCol3(intValue);
            case 4 -> arbeitssuchende.setCol4(intValue);
            case 5 -> arbeitssuchende.setCol5(intValue);
            case 6 -> arbeitssuchende.setCol6(intValue);
            case 7 -> arbeitssuchende.setCol7(intValue);
            case 8 -> arbeitssuchende.setCol8(intValue);
            case 9 -> arbeitssuchende.setCol9(intValue);
            case 10 -> arbeitssuchende.setCol10(intValue);
            case 11 -> arbeitssuchende.setCol11(intValue);
          }
        }

        if (!arbeitssuchende.isEmpty()) {
          arbeitssuchendeList.add(arbeitssuchende);
        }
      }

      return arbeitssuchendeList;
    }
  }
}


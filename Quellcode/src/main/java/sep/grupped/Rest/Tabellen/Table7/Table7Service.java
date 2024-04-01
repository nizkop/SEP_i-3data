package sep.grupped.Rest.Tabellen.Table7;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

@Service
public class Table7Service {

  public List<Strassenliste> parseCsvFile(MultipartFile file) throws IOException {
    try (Reader reader = new InputStreamReader(file.getInputStream())) {
      CsvToBean<Strassenliste> csvToBean = new CsvToBeanBuilder<Strassenliste>(reader)
        .withType(Strassenliste.class)
        .build();
      return csvToBean.parse();
    }
  }
}


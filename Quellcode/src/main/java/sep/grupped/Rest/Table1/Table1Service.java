package sep.grupped.Rest.Table1;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

@Service
public class Table1Service {

  public List<VnNeugeboreneAC> parseCsvFile(MultipartFile file) throws IOException {
    try (Reader reader = new InputStreamReader(file.getInputStream())) {
      CsvToBean<VnNeugeboreneAC> csvToBean = new CsvToBeanBuilder<VnNeugeboreneAC>(reader)
        .withType(VnNeugeboreneAC.class)
        .build();
      return csvToBean.parse();
    }
  }
}


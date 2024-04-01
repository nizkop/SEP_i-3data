package sep.grupped.Rest.Tabellen.Table5;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

@Service
public class Table5Service {
  public List<MittlereJahresBevoelkerung> parseXmlFile(MultipartFile file) throws IOException {
    try (InputStream inputStream = file.getInputStream()) {
      XmlMapper xmlMapper = new XmlMapper();
      MittlereJahresBevoelkerung[] mittlereJahresBevoelkerung = xmlMapper.readValue(inputStream, MittlereJahresBevoelkerung[].class);
      return Arrays.asList(mittlereJahresBevoelkerung);
    }
  }
}

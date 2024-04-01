package sep.grupped.Rest.Table6;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

@Service
public class Table6Service {
  public List<Privathaushalte> parseXmlFile(MultipartFile file) throws IOException {
    try (InputStream inputStream = file.getInputStream()) {
      XmlMapper xmlMapper = new XmlMapper();
      Privathaushalte[] privathaushalte = xmlMapper.readValue(inputStream, Privathaushalte[].class);
      return Arrays.asList(privathaushalte);
    }
  }
}

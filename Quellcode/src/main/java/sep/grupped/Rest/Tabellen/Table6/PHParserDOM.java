package sep.grupped.Rest.Tabellen.Table6;

import org.w3c.dom.*;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PHParserDOM {

  public List<Privathaushalte> parse(InputStream xmlInputStream) throws Exception {
    List<Privathaushalte> privathaushalteList = new ArrayList<>();
    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
    DocumentBuilder builder = factory.newDocumentBuilder();
    Document document = builder.parse(xmlInputStream);
    NodeList datasetList = document.getElementsByTagName("genml:VALUE");
    Map<String, String> cityMap = extractCities(datasetList);
    System.out.println("City Map:");
    for (Map.Entry<String, String> entry : cityMap.entrySet()) {
      System.out.println("City: " + entry.getKey() + ", Number: " + entry.getValue());
    }
    privathaushalteList = processNodeList(datasetList, cityMap);

    return privathaushalteList;
  }
  public static Map<String, String> extractCities(NodeList nodeList) {
    Map<String, String> cityMap = new HashMap<>();

    for (int i = 0; i < nodeList.getLength(); i++) {
      Node node = nodeList.item(i);
      if (node.getNodeType() == Node.ELEMENT_NODE) {
        Element valueElement = (Element) node;
        NodeList classificationKeyList = valueElement.getElementsByTagName("genml:CLASSIFICATION-KEY");
        NodeList shortDescriptionList = valueElement.getElementsByTagName("genml:SHORT-DESCRIPTION");
        NodeList textList = valueElement.getElementsByTagName("genml:TEXT");

        if (classificationKeyList.getLength() > 0 && shortDescriptionList.getLength() > 0 && textList.getLength() > 0) {
          String cityNumber = classificationKeyList.item(0).getTextContent().trim();
          String cityName = "";

          for (int j = 0; j < textList.getLength(); j++) {
            Node textNode = textList.item(j);
            if (textNode.getAttributes().getNamedItem("LANG").getNodeValue().equals("de")) {
              cityName = textNode.getTextContent().trim();
              break;
            }
          }

          if (!cityNumber.isEmpty() && !cityName.isEmpty()) {
            cityMap.put(cityNumber, cityName);
          }
        }
      }
    }

    return cityMap;
  }

  public static List<Privathaushalte> processNodeList(NodeList nodeList, Map<String, String> cityNumberNameMap) {
    List<Privathaushalte> privathaushalteList = new LinkedList<>();
    Map<String, Privathaushalte> privathaushalteCache = new HashMap<>();

    Pattern pattern = Pattern.compile("\\[JAHR]\\.\\[(\\d{4})],\\[KREISE]\\.\\[(\\d{5})]");

    for (int i = 0; i < nodeList.getLength(); i++) {
      Node node = nodeList.item(i);
      if (node.getNodeType() == Node.ELEMENT_NODE) {
        Element valueElement = (Element) node;
        String coordinate = valueElement.getAttribute("COORDINATE");
        String orig = valueElement.getAttribute("ORIG");

        Matcher matcher = pattern.matcher(coordinate);

        if (matcher.find()) {
          int jahr = Integer.parseInt(matcher.group(1));
          String cityNumber = matcher.group(2);
          int population = Integer.parseInt(orig);

          String cityName = cityNumberNameMap.get(cityNumber);
          Privathaushalte privathaushalte = privathaushalteCache.computeIfAbsent(cityNumber, k -> {
            Privathaushalte data = new Privathaushalte();
            data.setCity(cityName);
            data.setJahr(jahr);
            return data;
          });

          String regionNumber = cityNumber.substring(0, 3);
          String regionName = cityNumberNameMap.get(regionNumber);
          if (regionName != null) {
            privathaushalte.setBezirk(regionName);
          }
          privathaushalte.setState("Nordrhein-Westfalen");
          privathaushalte.setAnzahl(population);

          if (privathaushalte.getAnzahl() != 0) {
            privathaushalteList.add(privathaushalte);
            privathaushalteCache.remove(cityNumber);
          }
        }
      }
    }
    return privathaushalteList;
  }

}

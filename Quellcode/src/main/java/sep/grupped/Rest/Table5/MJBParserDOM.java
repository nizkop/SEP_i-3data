package sep.grupped.Rest.Table5;

import org.w3c.dom.*;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MJBParserDOM {

  public List<MittlereJahresBevoelkerung> parse(InputStream xmlInputStream) throws Exception {
    List<MittlereJahresBevoelkerung> mittlereJahresBevoelkerungList;
    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
    DocumentBuilder builder = factory.newDocumentBuilder();
    Document document = builder.parse(xmlInputStream);
    NodeList datasetList = document.getElementsByTagName("genml:VALUE");
    Map<String, String> cityMap = extractCities(datasetList);

    mittlereJahresBevoelkerungList = processNodeList(datasetList, cityMap);

    return mittlereJahresBevoelkerungList;
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

  public static List<MittlereJahresBevoelkerung> processNodeList(NodeList nodeList, Map<String, String> cityNumberNameMap) {
    List<MittlereJahresBevoelkerung> mittlereJahresBevoelkerungList = new LinkedList<>();
    Map<String, MittlereJahresBevoelkerung> mittlereJahresBevoelkerungCache = new HashMap<>();

    Pattern pattern = Pattern.compile("\\[JAHR]\\.\\[(\\d{4})],\\[GES]\\.(\\[?%TOTAL%]?|\\[?GESM]?|\\[?GESW]?),\\[KREISE]\\.\\[(\\d{5})]");

    for (int i = 0; i < nodeList.getLength(); i++) {
      Node node = nodeList.item(i);
      if (node.getNodeType() == Node.ELEMENT_NODE) {
        Element valueElement = (Element) node;
        String coordinate = valueElement.getAttribute("COORDINATE");
        String orig = valueElement.getAttribute("ORIG");

        Matcher matcher = pattern.matcher(coordinate);

        if (matcher.find()) {
          int jahr = Integer.parseInt(matcher.group(1));
          String ges = matcher.group(2);
          String cityNumber = matcher.group(3);
          int population = Integer.parseInt(orig);

          String cityName = cityNumberNameMap.get(cityNumber);
          MittlereJahresBevoelkerung mittlereJahresBevoelkerung = mittlereJahresBevoelkerungCache.computeIfAbsent(cityNumber, k -> {
            MittlereJahresBevoelkerung data = new MittlereJahresBevoelkerung();
            data.setCity(cityName);
            data.setJahr(jahr);
            return data;
          });

          switch (ges) {
            case "GESM", "[GESM]" -> mittlereJahresBevoelkerung.setAmountMale(population);
            case "GESW", "[GESW]" -> mittlereJahresBevoelkerung.setAmountFemale(population);
            case "%TOTAL%", "[%TOTAL%]" -> mittlereJahresBevoelkerung.setAmountAll(population);
          }

          String regionNumber = cityNumber.substring(0, 3);
          String regionName = cityNumberNameMap.get(regionNumber);
          if (regionName != null) {
            mittlereJahresBevoelkerung.setBezirk(regionName);
          }
          mittlereJahresBevoelkerung.setState("Nordrhein-Westfalen");


          if (mittlereJahresBevoelkerung.getAmountMale() != 0 && mittlereJahresBevoelkerung.getAmountFemale() != 0 && mittlereJahresBevoelkerung.getAmountAll() != 0) {
            mittlereJahresBevoelkerungList.add(mittlereJahresBevoelkerung);
            mittlereJahresBevoelkerungCache.remove(cityNumber);
          }
        }
      }
    }
    return mittlereJahresBevoelkerungList;
  }

}

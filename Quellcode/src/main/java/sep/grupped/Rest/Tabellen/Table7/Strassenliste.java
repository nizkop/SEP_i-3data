package sep.grupped.Rest.Tabellen.Table7;

import com.opencsv.bean.CsvBindByName;

import javax.persistence.*;

@Entity
@Table(name = "Strassenliste_Aachen")
public class Strassenliste {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @CsvBindByName(column = "FID")
  private String fid;

  @CsvBindByName(column = "gemeindeschluessel")
  private int gemeindeschluessel;

  @CsvBindByName(column = "strassenschluessel")
  private int strassenschluessel;

  @CsvBindByName(column = "strasse")
  private String strasse;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getFid() {
    return fid;
  }

  public void setFid(String fid) {
    this.fid = fid;
  }

  public int getGemeindeschluessel() {
    return gemeindeschluessel;
  }

  public void setGemeindeschluessel(int gemeindeschluessel) {
    this.gemeindeschluessel = gemeindeschluessel;
  }

  public int getStrassenschluessel() {
    return strassenschluessel;
  }

  public void setStrassenschluessel(int strassenschluessel) {
    this.strassenschluessel = strassenschluessel;
  }

  public String getStrasse() {
    return strasse;
  }

  public void setStrasse(String strasse) {
    this.strasse = strasse;
  }
}

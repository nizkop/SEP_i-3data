package sep.grupped.Rest.Table6;

import javax.persistence.*;

@Entity
@Table(name = "Privathaushalte_kreisfreie_Staedte_und_Kreise")
public class Privathaushalte {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String city;
  private int jahr;
  private int anzahl;
  private String bezirk;
  private String state;

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public int getJahr() {
    return jahr;
  }

  public void setJahr(int jahr) {
    this.jahr = jahr;
  }

  public int getAnzahl() {
    return anzahl;
  }

  public void setAnzahl(int anzahl) {
    this.anzahl = anzahl;
  }

  public String getBezirk() {
    return bezirk;
  }

  public void setBezirk(String bezirk) {
    this.bezirk = bezirk;
  }

  public String getState() {
    return state;
  }

  public void setState(String state) {
    this.state = state;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getId() {
    return id;
  }
}

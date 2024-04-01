package sep.grupped.Rest.Tabellen.Table5;

import javax.persistence.*;
@Entity
@Table(name = "Mittlere_Jahresbevoelkerung_nach_Geschlecht")
public class MittlereJahresBevoelkerung {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private int jahr;
  private String city;
  private String bezirk;
  private String state;
  private int amountMale;
  private int amountFemale;
  private int amountAll;

  public int getJahr() {
    return jahr;
  }

  public void setJahr(int jahr) {
    this.jahr = jahr;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public int getAmountMale() {
    return amountMale;
  }

  public void setAmountMale(int amountMale) {
    this.amountMale = amountMale;
  }

  public int getAmountFemale() {
    return amountFemale;
  }

  public void setAmountFemale(int amountFemale) {
    this.amountFemale = amountFemale;
  }

  public int getAmountAll() {
    return amountAll;
  }

  public void setAmountAll(int amountAll) {
    this.amountAll = amountAll;
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

  @Override
  public String toString() {
    return "MittlereJahresBevoelkerung{" +
      "id=" + id +
      ", jahr=" + jahr +
      ", city='" + city + '\'' +
      ", amountMale=" + amountMale +
      ", amountFemale=" + amountFemale +
      ", amountAll=" + amountAll +
      '}';
  }
}

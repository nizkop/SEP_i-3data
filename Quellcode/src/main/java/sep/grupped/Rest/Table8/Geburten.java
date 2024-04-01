package sep.grupped.Rest.Table8;

import javax.persistence.*;

@Entity
@Table(name = "Geburten_Aachen")
public class Geburten {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private int jahr;
  private int gesamt;
  private int januar;
  private int februar;
  private int maerz;
  private int april;
  private int mai;
  private int juni;
  private int juli;
  private int august;
  private int september;
  private int oktober;
  private int november;
  private int dezember;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public int getGesamt() {
    return gesamt;
  }

  public void setGesamt(int gesamt) {
    this.gesamt = gesamt;
  }

  public int getJahr() {
    return jahr;
  }

  public void setJahr(int jahr) {
    this.jahr = jahr;
  }

  public int getJanuar() {
    return januar;
  }

  public void setJanuar(int januar) {
    this.januar = januar;
  }

  public int getFebruar() {
    return februar;
  }

  public void setFebruar(int februar) {
    this.februar = februar;
  }

  public int getMaerz() {
    return maerz;
  }

  public void setMaerz(int maerz) {
    this.maerz = maerz;
  }

  public int getApril() {
    return april;
  }

  public void setApril(int april) {
    this.april = april;
  }

  public int getMai() {
    return mai;
  }

  public void setMai(int mai) {
    this.mai = mai;
  }

  public int getJuni() {
    return juni;
  }

  public void setJuni(int juni) {
    this.juni = juni;
  }

  public int getJuli() {
    return juli;
  }

  public void setJuli(int juli) {
    this.juli = juli;
  }

  public int getAugust() {
    return august;
  }

  public void setAugust(int august) {
    this.august = august;
  }

  public int getSeptember() {
    return september;
  }

  public void setSeptember(int september) {
    this.september = september;
  }

  public int getOktober() {
    return oktober;
  }

  public void setOktober(int oktober) {
    this.oktober = oktober;
  }

  public int getNovember() {
    return november;
  }

  public void setNovember(int november) {
    this.november = november;
  }

  public int getDezember() {
    return dezember;
  }

  public void setDezember(int dezember) {
    this.dezember = dezember;
  }
}


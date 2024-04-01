package sep.grupped.Rest.Table4;

import javax.persistence.*;

@Entity
@Table(name = "Arbeitslose_Aachen")
public class Arbeitslose {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String datum;

  private int col1;
  private int col2;
  private int col3;
  private int col4;
  private int col5;
  private int col6;
  private int col7;
  private int col8;
  private int col9;
  private int col10;
  private int col11;
  private int col12;

  public boolean isEmpty() {
    return this.datum.isEmpty() &&
      this.col1 == 0 &&
      this.col2 == 0 &&
      this.col3 == 0 &&
      this.col4 == 0 &&
      this.col5 == 0 &&
      this.col6 == 0 &&
      this.col7 == 0 &&
      this.col8 == 0 &&
      this.col9 == 0 &&
      this.col10 == 0 &&
      this.col11 == 0 &&
      this.col12 == 0;
  }
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getDatum() {
    return datum;
  }

  public void setDatum(String datum) {
    this.datum = datum;
  }

  public int getCol1() {
    return col1;
  }

  public void setCol1(int col1) {
    this.col1 = col1;
  }

  public int getCol2() {
    return col2;
  }

  public void setCol2(int col2) {
    this.col2 = col2;
  }

  public int getCol3() {
    return col3;
  }

  public void setCol3(int col3) {
    this.col3 = col3;
  }

  public int getCol4() {
    return col4;
  }

  public void setCol4(int col4) {
    this.col4 = col4;
  }

  public int getCol5() {
    return col5;
  }

  public void setCol5(int col5) {
    this.col5 = col5;
  }

  public int getCol6() {
    return col6;
  }

  public void setCol6(int col6) {
    this.col6 = col6;
  }

  public int getCol7() {
    return col7;
  }

  public void setCol7(int col7) {
    this.col7 = col7;
  }

  public int getCol8() {
    return col8;
  }

  public void setCol8(int col8) {
    this.col8 = col8;
  }

  public int getCol9() {
    return col9;
  }

  public void setCol9(int col9) {
    this.col9 = col9;
  }

  public int getCol10() {
    return col10;
  }

  public void setCol10(int col10) {
    this.col10 = col10;
  }

  public int getCol11() {
    return col11;
  }

  public void setCol11(int col11) {
    this.col11 = col11;
  }

  public int getCol12() {
    return col12;
  }

  public void setCol12(int col12) {
    this.col12 = col12;
  }
}

package sep.grupped.Rest.Tabellen.Table1;

import javax.persistence.*;

@Entity
@Table(name = "Vornamen_Neugeborene_Aachen")
public class VnNeugeboreneAC {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int anzahl;
    private String vorname;
    private String geschlecht;
    private int position;

  public String getTableName() {
    return "Vornamen der Neugeborenen in Aachen";
  }

  private String tableName;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public int getAnzahl() {
      return anzahl;
    }

    public void setAnzahl(int anzahl) {
      this.anzahl = anzahl;
    }

    public String getVorname() {
        return vorname;
    }

    public void setVorname(String vorname) {
        this.vorname = vorname;
    }

    public String getGeschlecht() {
        return geschlecht;
    }

    public void setGeschlecht(String geschlecht) {
        this.geschlecht = geschlecht;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }
}

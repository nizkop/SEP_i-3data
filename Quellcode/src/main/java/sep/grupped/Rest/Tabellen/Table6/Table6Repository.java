package sep.grupped.Rest.Tabellen.Table6;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Table6Repository extends JpaRepository <Privathaushalte, Long> {
  Privathaushalte findByJahr(int jahr);
  Privathaushalte findByBezirk(String bezirk);
  Privathaushalte findByState(String state);
  Privathaushalte findByCity(String city);
  Privathaushalte findByAnzahl(int anzahl);
}
